const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

describe('invalid users are not added', () => {
    test('user without username or pass is not added', async () => {
        const newUser = {
            name: 'test',
        }
      
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
      
        const usersAtEnd = await helper.usersInDb()
      
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    })
    test('user with username or pass with length less than 3 is not added', async () => {
        const newUser = {
            name: 'test',
            username: '12',
            password: '12'
        }
      
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
      
        const usersAtEnd = await helper.usersInDb()
      
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    })
})

afterAll(() => {
  mongoose.connection.close()
})