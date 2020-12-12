const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Why Blogging is The Future',
    author: 'Buck Manstrong',
    url: 'http://www.fakeblog.com',
    likes: 18
  },
  {
    title: 'Why Blogging is Antiquated',
    author: 'Stevesie',
    url: 'http://www.notarealblog.com',
    likes: 58
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'fake name', url: 'http://www.fakepage.com', likes: 0 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}