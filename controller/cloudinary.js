const {Router } = require('express')
const multer = require('multer')
const cloudinary = require('cloudinary').v2

const rutaCloudinary = Router()
const upload = multer({dest: 'uploads'})

rutaCloudinary.post('/', upload.single('image') ,async (req, res) => {
    console.log(req.file.path)
    try{
        const result = await cloudinary.uploader.upload(req.file.path)
        res.status(200).json(result)
    }catch(err){
        res.status(400).send(err.message)
    }
})

module.exports = rutaCloudinary