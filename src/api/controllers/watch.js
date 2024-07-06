const { deleteFile } = require('../../utils/deleteFile')
const Watch = require('../models/watch')

const getWatches = async (req, res, next) => {
  try {
    const watches = await Watch.find().populate('brand')
    return res.status(200).json(watches)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const addWatch = async (req, res, next) => {
  try {
    const newWatch = new Watch(req.body)
    if (req.file) {
      newWatch.img = req.file.path
    }
    const watchSaved = await newWatch.save()
    return res.status(201).json(watchSaved)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const updateWatch = async (req, res, next) => {
  try {
    const { id } = req.params
    const newWatch = new Watch(req.body)
    newWatch._id = id
    if (req.file) {
      newWatch.img = req.file.path
      const oldWatch = await Watch.findById(id)
      deleteFile(oldWatch.img)
    }
    const watchUpdated = await Watch.findByIdAndUpdate(id, newWatch, {
      new: true
    })
    return res.status(200).json(watchUpdated)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const deleteWatch = async (req, res, next) => {
  try {
    const { id } = req.params
    const watchDeleted = await Watch.findByIdAndDelete(id)
    deleteFile(watchDeleted.img)
    return res.status(200).json({
      message: 'Reloj eliminado',
      watchDeleted
    })
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = { getWatches, addWatch, updateWatch, deleteWatch }
