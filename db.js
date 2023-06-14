const {Sequelize} = require('sequelize')
require('dotenv').config()
const productos = require('./models/productos')
const compras = require('./models/compras')
const infos = require('./models/info')
const enviarOfertas = require('./models/enviarOfertas')
const pedidos = require('./models/pedido')
const usuarios = require('./models/usuario')

let usuarioDB = process.env.DB_USER
let contraseña = process.env.DB_PASSWORD
let host = process.env.DB_HOST

const database = new Sequelize(`postgres://${usuarioDB}:${contraseña}@${host}/loaconcept`,  {logging: false} )

productos(database)
compras(database)
infos(database)
enviarOfertas(database)
pedidos(database)
usuarios(database)

const { producto, compra, info, ofertas, pedido , usuario} = database.models

producto.hasMany(pedido,{
  foreignKey:'productoId'
})
pedido.belongsTo(producto);

compra.belongsToMany(pedido, {through: 'compra-pedidos'});
pedido.belongsToMany(compra, {through: 'compra-pedidos'});

usuario.hasMany(compra,{
  foreignKey:'usuarioId'
})
compra.belongsTo(usuario);

module.exports = {database, producto,  compra, info, ofertas, pedido, usuario} 