const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) return next({ name: 'Unauthorized' })

  const userForToken = {
    username: user.id,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
