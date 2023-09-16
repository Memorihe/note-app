const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async () => {
  await helper.createTestUser()
})

describe('login api', () => {
  test('bad user or bad password should returned state 401', async () => {
    await api
      .post('/api/login')
      .send({ username: 'aitherios', password: '0000' })
      .expect(401)
  })

  test('correct username and password, should returned token', async () => {
    const { body } = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200)

    expect(body.token).toBeDefined()
  })
})
