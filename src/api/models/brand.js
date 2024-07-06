const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'brands'
  }
)

const Brand = mongoose.model('brands', brandSchema, 'brands')

module.exports = Brand
