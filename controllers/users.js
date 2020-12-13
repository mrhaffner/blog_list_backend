const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
      .find({}).populate('blogs')
  
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.password === undefined) {
    return response.status(400).json({ error: 'password missing' })
  } else if (body.password.split("").length < 3) {
    return response.status(400).json({ error: 'password must have a length of at least 3' })

  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter