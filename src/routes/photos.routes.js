const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises')
const router = express.Router();
const db = require('../databases/db');


const diskStorage = multer.diskStorage({
    destination: path.join('public/images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const filesUploaded = multer({
    storage: diskStorage,
}).single('image')

router.post('/uploadBanner', filesUploaded, async (req, res) => {
    try {
        const fileLocation = req.file.path; // Ubicación del archivo en el servidor
        const email = req.body.email;
        console.log(req.file)
        const fileLocationWithoutPublic = fileLocation.replace('\public', '');
        await db.editImageBanner(email, fileLocationWithoutPublic);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message || "An error occurred while registering user" });
    }
})

router.post('/uploadImage', filesUploaded, async (req, res) => {
    try {
        const fileLocation = req.file.path; // Ubicación del archivo en el servidor
        const userId = req.body.userId;
        console.log(req.file);
        const fileLocationWithoutPublic = fileLocation.replace('\public', '');

        // Guarda la ruta de la imagen en la base de datos o en algún otro lugar, si es necesario
        await db.insertImageURL(userId, fileLocationWithoutPublic);

        // Envía la ruta de la imagen como parte de la respuesta JSON
        res.status(201).json({ message: "Image uploaded successfully", imageUrl: fileLocationWithoutPublic });
    } catch (error) {
        res.status(500).json({ error: error.message || "An error occurred while uploading image" });
    }
});

router.delete('/deleteImage', async (req, res) => {
    try {
      const imagePath = req.body.urlPath; // Ruta relativa de la imagen
      const imageType = req.body.imageType; // Tipo de imagen (puede ser 'profilePhoto' o 'banner')
  
      console.log('Ruta de la imagen:', imagePath);
      console.log('Tipo de imagen:', imageType);
  
      // Elimina la imagen del sistema de archivos
      await fs.unlink(`public\\${imagePath}`);
  
      const result = await db.deleteImages(imagePath, imageType);
      console.log('Resultado de la eliminación:', result);
  
      // Envía una respuesta de éxito
      res.status(200).json({ message: 'Imagen eliminada con éxito', result });
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
      res.status(500).json({ error: 'Error al eliminar la imagen' });
    }
  });

module.exports = router