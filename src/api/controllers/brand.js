const { deleteFile } = require('../../utils/deleteFile')
const Brand = require('../models/brand')

const getBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find()
    return res.status(200).json(brands)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const addBrand = async (req, res, next) => {
  try {
    const newBrand = new Brand(req.body)
    if (req.file) {
      newBrand.img = req.file.path
    }
    const brandSaved = await newBrand.save()
    return res.status(201).json(brandSaved)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params
    const newBrand = new Brand(req.body)
    newBrand._id = id
    if (req.file) {
      newBrand.img = req.file.path
      const oldBrand = await Brand.findById(id)
      deleteFile(oldBrand.img)
    }
    const brandUpdated = await Brand.findByIdAndUpdate(id, newBrand, {
      new: true
    })
    return res.status(200).json(brandUpdated)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params
    const brandDeleted = await Brand.findByIdAndDelete(id)
    deleteFile(brandDeleted.img)
    return res.status(200).json({
      message: 'Marca eliminada',
      elemento: brandDeleted
    })
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = { getBrands, addBrand, updateBrand, deleteBrand }
