# Proyecto 8 API REST Files
### _Rock The Code_
#### Jorge Pirolo

## Objetivos

>- Servidor con express ✅
>- Conexión a una base de datos de Mongo Atlas mediante mongoose ✅
>- Creación de dos modelos, ambos, con un campo que nos permita almacenar un archivo ✅
>- Una semilla que suba datos a una de las colecciones ✅
>- Una relación entre colecciones ✅
>- CRUD completo de todas las colecciones ✅
>- README.md con la documentación del proyecto, indicando los endpoints y que hace cada uno ✅
>- Subida de archivos mediante cloudinary a ambas colecciones ✅
>- Eliminación de archivos en cloudinary cuando se borra el dato en la BBDD ✅
>- Intento de reutilización del storage de cloudinary cambiando la carpeta (puede estar comentado) ✅

## Servidor
Servidor levantado con express en la ruta:
```
http://localhost:3000
```
## BBDD
Conectado a BBDD usando la librería `mongoose`. Puedes encontrar el enlace a Mongo Atlas en la variable `DB_URL` guardada en el `.env`
## Modelos
#### watch
>>>- img (file)
>>>- model
>>>- brand (relacionada con el modelo `brand`)

#### brand
>>>- name
>>>- img (file)

## Semilla

En la carpeta `seeds` dentro de `utils` encontraras la función asíncrona `lanzar semilla` que elimina todos los datos e inserta 10 marcas preestablecidas en la colección "brand"

## Relación entre colecciones
El modelo watch esta relacinado en su `key` `brand` con el modelo brand

## CRUD de watch

#### GET
Consulta todos los relojes en la BBDD y _"expande"_ la información de su clave `brand`
#### POST
Publica una nuevo reloj obteniendo los datos mediante el `body` de la `req`
Verifica si hay un file en el req y le asigna el path a la img 
#### PUT (Update)
Actualiza un reloj (recogido mediante el `id` por los `params`)
Verifica si hay un file para asignarle una nueva imagen al elemento
Llama a la función `deleteFile()` para eliminar la imagen anterior en _Cloudinary_
#### DELETE
Elimina un reloj recogido por el `id` en los `params`
Llama a la función `deleteFile()` para eliminar la imagen en _Cloudinary_

## CRUD de brand

#### GET
Consulta todos las marcas en la BBDD
#### POST
Publica una nueva marca obteniendo los datos mediante el `body` de la `req`
Verifica si hay un file en el req y le asigna el path a la img 
#### PUT (Update)
Actualiza una marca (recogida mediante el `id` por los `params`)
Verifica si hay un file para asignarle una nueva imagen al elemento
Llama a la función `deleteFile()` para eliminar la imagen anterior en _Cloudinary_
#### DELETE
Elimina una marca recogida por el `id` en los `params`
Llama a la función `deleteFile()` para eliminar la imagen en _Cloudinary_


## ROUTES
Utilizamos mediante express las siguientes rutas
### watch
```javascript
const uploadWatch = createUploader('watches')

watchesRouter.get('/', getWatches)
watchesRouter.post('/', uploadWatch.single('img'), addWatch)
watchesRouter.put('/:id', uploadWatch.single('img'), updateWatch)
watchesRouter.delete('/:id', deleteWatch)
```
En el post y en el put utilizamos el middleware `uploadWatch.single("img")` que se encarga de subir la imagen en la carpeta "watches" de _Cloudinary_


### brand
```javascript
const uploadBrand = createUploader('brands')

brandsRouter.get('/', getBrands)
brandsRouter.post('/', uploadBrand.single('img'), addBrand)
brandsRouter.put('/:id', uploadBrand.single('img'), updateBrand)
brandsRouter.delete('/:id', deleteBrand)
```

En el post y en el put utilizamos el middleware `uploadBrand.single("img")` que se encarga de subir la imagen en la carpeta "brands" de _Cloudinary_


## MIDDLEWARES
Usamos las librerías `multer`, `cloudinary`y `multer-storage-cloudinary` para realizar la subida de las imagenes a _Cloudinary_
Con la función `createUploader` podemos indicar en qué carpeta de _Cloudinary_ queremos guardar el archivo
```javascript
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
```

## UTILS
Función `deleteFile` a la cual le enviamos el url de _Cloudinary_ de la imagen que queremos eliminar
```javascript
const cloudinary = require('cloudinary').v2

const deleteFile = (imgUrl) => {
  const imgSplited = imgUrl.split('/')
  const folderName = imgSplited.at(-2)
  const fileName = imgSplited.at(-1).split('.')

  const public_id = `${folderName}/${fileName[0]}`

  cloudinary.uploader.destroy(public_id, () => {
    console.log('Eliminado')
  })
}
```

