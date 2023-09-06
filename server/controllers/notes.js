const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response, next) => {
  Note.find({})
    .then((notes) => {
      response.json(notes)
    })
})

notesRouter.post('/', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    date: new Date(),
    important: body.important || false
  })

  note
    .save()
    .then((savedNote) => savedNote.toJSON())
    .then((formattedNote) => response.json(formattedNote))
    .catch((err) => next(err))
})

notesRouter.get('/:id', (request, response, next) => {
  const { id } = request.params

  Note.findById(id)
    .then((note) => {
      if (note) return response.json(note)
      response.status(404).end()
    })
    .catch((err) => next(err))
})

notesRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndDelete(id)
    .then(() => response.status(204))
    .catch((err) => next(err))
})

notesRouter.put('/:id', (request, response) => {
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

module.exports = notesRouter
