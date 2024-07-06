require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const watchesRouter = require('./src/api/routes/watch')
const brandsRouter = require('./src/api/routes/brand')
const cloudinary = require('cloudinary').v2

const app = express()

connectDB()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

app.use(express.json())

app.use('/api/v1/watches', watchesRouter)
app.use('/api/v1/brands', brandsRouter)

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
})

app.listen(3000, () => {
  console.log('El servidor esta levantado en http://localhost:3000')
})
