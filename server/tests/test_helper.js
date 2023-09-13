const Note = require('../models/note')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon', date: new Date() })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDB = async () => {
  const notes = await Note.find({})
  return notes.map((note) => note.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}


const createTestUser = async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
}

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDB,
  usersInDB,
  createTestUser
}
