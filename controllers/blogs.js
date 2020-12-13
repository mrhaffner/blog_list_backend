const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// blogsRouter.get('/:id', (request, response, next) => {
//   Blog.findById(request.params.id)
//     .then(blog => {
//       if (blog) {
//         response.json(blog)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => next(error))
// })

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  // const blog = new Blog({
  //   title: request.body.title,
  //   author: request.body.author,
  //   url: request.body.url
  // })

  const savedBlog = await blog.save()
  response.json(savedBlog)
})

// blogsRouter.delete('/:id', (request, response, next) => {
//   Blog.findByIdAndRemove(request.params.id)
//     .then(() => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))
// })

// blogsRouter.put('/:id', (request, response, next) => {
//   const body = request.body

//   const blog = {
//     content: body.content,
//     important: body.important,
//   }

//   Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
//     .then(updatedblog => {
//       response.json(updatedblog)
//     })
//     .catch(error => next(error))
// })

module.exports = blogsRouter