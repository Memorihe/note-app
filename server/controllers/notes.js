const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (request, response, next) => {
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const note = new Note({
    content: body.content,
    date: new Date(),
    important: body.important || false,
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  
  response.json(savedNote)
})

notesRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params

  const note = await Note.findById(id)
  if (note) return response.json(note)
  response.status(404).end()
})

notesRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params

  await Note.findByIdAndDelete(id)
  response.status(204).end()
})

notesRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const body = request.body

  const newNoteInfo = {
    content: body.content,
    important: body.important
  }

  const note = await Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
  response.json(note)
})

module.exports = notesRouter
