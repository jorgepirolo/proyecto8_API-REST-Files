const createUploader = require('../../middlewares/file')
const upload = require('../../middlewares/file')
const {
  getWatches,
  addWatch,
  updateWatch,
  deleteWatch
} = require('../controllers/watch')

const watchesRouter = require('express').Router()
const uploadWatch = createUploader('watches')

watchesRouter.get('/', getWatches)
watchesRouter.post('/', uploadWatch.single('img'), addWatch)
watchesRouter.put('/:id', uploadWatch.single('img'), updateWatch)
watchesRouter.delete('/:id', deleteWatch)

module.exports = watchesRouter
