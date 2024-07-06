const createUploader = require('../../middlewares/file')
const upload = require('../../middlewares/file')
const {
  getBrands,
  addBrand,
  updateBrand,
  deleteBrand
} = require('../controllers/brand')

const brandsRouter = require('express').Router()
const uploadBrand = createUploader('brands')

brandsRouter.get('/', getBrands)
brandsRouter.post('/', uploadBrand.single('img'), addBrand)
brandsRouter.put('/:id', uploadBrand.single('img'), updateBrand)
brandsRouter.delete('/:id', deleteBrand)

module.exports = brandsRouter
