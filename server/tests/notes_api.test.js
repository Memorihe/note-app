const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Note = require('../models/note')

beforeEach(async () => {
  await helper.createTestUser()
  
  const usersInDB = await helper.usersInDB()
  const { id } = usersInDB.find((u) => u.username === 'root')

  await Note.deleteMany({})
  const noteObjects = helper.initialNotes.map(
    (note) => new Note({ ...note, user: id })
  )
  const promiseArray = noteObjects.map((note) => note.save())
  await Promise.all(promiseArray)
})

describe('get notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map((r) => r.content)
    expect(contents).toContain('Browser can execute only Javascript')
  })
})

describe('add note', () => {
  test('a valid note can be added', async () => {    
  const usersInDB = await helper.usersInDB()
  const { id } = usersInDB.find((u) => u.username === 'root')

    const newNote = {
      content: 'async/await simplies making async calls',
      important: true,
      userId: id
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDB()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

    const contents = notesAtEnd.map((n) => n.content)
    expect(contents).toContain('async/await simplies making async calls')
  })

  test('note without content is not added', async () => {
    const newNote = { important: true }

    await api.post('/api/notes').send(newNote).expect(400)

    const notesAtEnd = await helper.notesInDB()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
  })


})

afterAll(() => mongoose.connection.close())
