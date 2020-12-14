const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const loggedInToken = '';
beforeEach(async () => {
    await Blog.deleteMany({})
  
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
})

test('correct amount of blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs unique identifier property is named "id"', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'New Blog',
        author: 'New Author',
        url: 'http://www.newblog.com',
        likes: 5000
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
    const contents = blogsAtEnd.map(n => n.author)
    expect(contents).toContain(
        'New Author'
    )
})

test('if likes is not included in a post, it defaults to 0', async () => {
    const newBlog = {
        title: 'New Blog',
        author: 'New Author',
        url: 'http://www.newblog.com',
    }
    await api
        .post('/api/blogs')
        .send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map(n => n.likes)
    expect(likes).toContain(0)
})

test('blog without title or url is not added', async () => {
    const newBlog = {
        author: 'New Author',
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
  
      const blogsAtEnd = await helper.blogsInDb()
  
      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )
  
      const authors = blogsAtEnd.map(r => r.author)
  
      expect(authors).not.toContain(blogToDelete.author)
    })
})

afterAll(() => {
  mongoose.connection.close()
})