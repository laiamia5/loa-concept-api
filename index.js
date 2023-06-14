const express = require('express')
const cors = require('cors')
require('dotenv').config()
const rutaProducto = require('./routes/productos')
const rutaCompras = require('./routes/compras')
const rutaInfo = require('./routes/info')
const payRouter = require('./controller/mercadopago')
const {database} = require('./db')
const rutaEnvioOfertas = require('./routes/enviarOfertas')
const rutaPedido = require('./routes/pedido')
const rutaUsuario = require('./routes/usuario')
const path = require('path');
const rutaCloudinary = require('./controller/cloudinary')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


app.use('/productos', rutaProducto)
app.use('/compras', rutaCompras)
app.use('/info', rutaInfo )
app.use('/pagar', payRouter )
app.use('/subscripcion', rutaEnvioOfertas)
app.use('/realizar-pedido', rutaPedido )
app.use('/usuarios', rutaUsuario)
app.use('/upload', rutaCloudinary)


database
.sync({alter: true})
.then(() => {
    app.listen(process.env.PORT, () => {
      console.log('se esta escuchando todo bien'); 
    });
});