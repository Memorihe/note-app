const mongoose = require('mongoose')

const connectionString = process.env.MONGODB_URI

mongoose
  .connect(connectionString, {})
  .then(() => console.log('Database is connected'))
  .catch((err) => console.log(err))
