//* Recoger un archivo y poder interpretarlo (multer) (multipart form data)
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const createUploader = (folder) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folder,
      allowedFormats: ['jpg', 'png', 'jpeg', 'gif']
    }
  })

  return multer({ storage })
}

module.exports = createUploader
