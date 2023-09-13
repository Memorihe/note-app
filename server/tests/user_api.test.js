const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

beforeAll(async () => {
  await User.deleteMany({})
  
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('get all users', () => {
  test('should returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('should returned id key', async () => {
    const { body } = await api.get('/api/users')
    expect(body[0].id).toBeDefined()
  })

  test('should returned all users', async () => {
    const { body } = await api.get('/api/users')
    const usersDB = await helper.usersInDB()
    expect(body).toHaveLength(usersDB.length)
  })
})

describe('post user', () => {
  test('should increment user collection by one', async () => {
    const newUser = {
      username: 'dark',
      name: 'Luis',
      password: '0000'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    const namesAtEnd = usersAtEnd.map((u) => u.name)
    expect(namesAtEnd).toContain('Luis')
  })

  test('if username length is less 4, should returned error 400', async () => {
    await api
      .post('/api/users')
      .send({ username: 'abc', name: 'Andrea', password: '0000' })
      .expect(400)
  })


  test('if password length is less 4, should returned error 400', async () => {
    await api
      .post('/api/users')
      .send({ username: 'Andrea', name: 'Andrea', password: '123' })
      .expect(400)
  })
})

afterAll(() => mongoose.connection.close())
