require('dotenv').config()
const mongoose = require('mongoose')
const Brand = require('../../api/models/brand')
const brands = require('../../data/brands')

const lanzarSemilla = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)

    await Brand.collection.drop()
    console.log('Marcas eliminadas')

    await Brand.collection.insertMany(brands)
    console.log('Marcas incluidas')

    await mongoose.disconnect()
    console.log('Desconectado de la BBDD')
  } catch (error) {
    console.log('Error al plantar la semilla 🪴❌')
  }
}

lanzarSemilla()
