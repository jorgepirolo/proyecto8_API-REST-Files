const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Connected to DB!')
  } catch (error) {
    console.log('Not connected champ')
  }
}

module.exports = { connectDB }
