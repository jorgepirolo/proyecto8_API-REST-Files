const mongoose = require('mongoose')

const watchSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    model: { type: String, required: true },
    brand: { type: mongoose.Types.ObjectId, ref: 'brands' }
  },
  {
    timestamps: true,
    collection: 'watches'
  }
)

const Watch = mongoose.model('watches', watchSchema, 'watches')

module.exports = Watch
