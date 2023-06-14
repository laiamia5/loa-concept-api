const {Router} = require('express')
const {ofertas } = require('../db')
const {enviarMail_aClientas} = require('../controller/nodemailer')

const rutaEnvioOfertas = Router()

rutaEnvioOfertas.post('/', (req, res) => {
    const {nombre, email} = req.body
    try{
        ofertas.create({
            nombre,
            email
        })
        res.status(200).send('se subscrito de forma exitosa')
    }catch(err){
        res.status(400).send(err)
    }
})

rutaEnvioOfertas.get('/',async (req, res) => {
    try{
        let subscirtos = await ofertas.findAll()
        res.status(200).send(subscirtos)
    }catch(err){
        res.status(400).send(err)
    }
})

rutaEnvioOfertas.post('/realizar-envio', async (req, res) => {
    const { asunto, mensaje, clientaEmail} = req.body
    try{
        enviarMail_aClientas(asunto, mensaje, clientaEmail)
        res.status(200).send('mensaje enviado exitosamente')
    }catch(err){
        res.status(400).send('hubo un error')
    }
})

module.exports = rutaEnvioOfertas