require('dotenv').config()
require('./database')

const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())

app.use(cors())

const Note = require('./models/note')
const handleErrors = require('./middlewares/handleErrors')
const notFound = require('./middlewares/notFound')

app.get('/', (response) => {
  response.send('<h1>Notes app, welcome</h1>')
})

app.get('/api/notes', (request, response, next) => {
  Note.find({})
    .then((notes) => {
      response.json(notes)
    })
    .catch((err) => next)
})

app.get('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  Note.findById(id)
    .then((note) => {
      if (note) return response.json(note)
      response.status(404).end()
    })
    .catch((err) => next(err))
})

app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndDelete(id)
    .then(() => response.status(204))
    .catch((err) => next(err))
})

app.post('/api/notes', (request, response) => {
  const body = request.body
console.log(body)
  if (!body.content) {
    return response.status(204).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    date: new Date(),
    important: body.important || false
  })

  note.save().then((savedNote) => {
    response.json(savedNote)
  })
})

app.put('/api/notes/:id', (request, response) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then((result) => response.json(result))
    .catch((err) => next(err))
})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
