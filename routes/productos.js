const {Router} = require('express')
const {producto} = require('../db')
const {Op} = require('sequelize');
const {paginar} =  require('../controller/index')

const rutaProducto = Router()

// ========================================== CREAR PRODUCTOS =====================================================

rutaProducto.post('/', async (req, res) => {
    const {nombre, precio, categoria, descripcion, marca, stock, img, cantidad, colores, precio_anterior, talles} = req.body
    try{
        let newProducto = await producto.create({
            nombre,
            precio,
            categoria, 
            descripcion,
            marca,
            stock,
            img,
            cantidad,
            colores,
            talles,
            precio_anterior
        })
        res.send(newProducto)
    }catch(err){
        if(!stock) return res.status(400).send('falta el dato "stock"')
        res.status(400).send(err)
    }
})
// ========================================== ACTUALIZAR PRODUCTOS =====================================================

rutaProducto.put('/actualizar/:id', async (req, res) => {
    const {id} = req.params
    const {
        nombre,
        precio,
        categoria, 
        descripcion,
        marca,
        stock,
        img,
        cantidad,
        colores,
        talles,
        precio_anterior
        } = req.body

    try{
        const cambiarUsuario = await producto.update( { precio_anterior, nombre, precio, descripcion, categoria, marca, stock, img, cantidad, colores, talles} , { where: { id: id } })
        res.status(200).json(cambiarUsuario)
    }catch(err){
        res.status(400).send(err.message)
    }
})


// ====================================== OBTENER TODOS LOS PRODUCTOS ============================================= 

rutaProducto.get('/', async (req, res) => {
    try{
        let todos_los_productos = await producto.findAll()
        res.status(200).send(todos_los_productos)
    }catch(err){
        res.status(400).send('sad!')
    }
})

// ========================================= PAGINADO ===========================================================

rutaProducto.get('/paginado', async (req, res) => {
    const {page} = req.query
    
        try{
            let productos = await producto.findAll()
            let result = await paginar(productos)
            
            if(page){
              return result[page] 
              ? res.status(200).json(result[page]) 
              : res.status(200).send('no existe la pagina que solicita')
            } else return res.status(200).json(result)

        }catch(err){
            res.status(400).send(err.message)
        }

})


// =========================================FILTRAR PRODUCTOS POR... CON PAGINADO=======================================

rutaProducto.get('/buscar', async (req, res) => {

    const {categoria} =  req.query
    const {nombre} = req.query
    const {page} = req.query

    try{
        if(categoria){
            let productos_por_categoria = await producto.findAll({where: {categoria: categoria}})
            let arrayPaginado = await paginar(productos_por_categoria)
            
            if(page){
                return  arrayPaginado[page] 
                ? res.status(200).json(arrayPaginado[page]) 
                : res.status(200).send('no existe la pagina que solicita')
              } else return res.status(200).json(arrayPaginado)

        }else if(nombre){
            let productos_por_busqueda_manual = await producto.findAll({where:{ nombre: {[Op.iLike]: `%${nombre}%`} }})
            let arrayPaginado = await paginar(productos_por_busqueda_manual)
            
            if(page){
                return  arrayPaginado[page] 
                ? res.status(200).json(arrayPaginado[page]) 
                : res.status(200).send('no existe la pagina que solicita')
              } else return res.status(200).json(arrayPaginado)
        }else{
            return res.send('algunos de los datos no son correctos')
        }
    }catch(err){
        res.status(400).send(err)
    }
})

// =========================================FILTRAR PRODUCTOS POR... COLORES , TAMAÑOS Y PRECIOS=======================================

rutaProducto.post('/filtrar', async (req, res) => {
    let {precios} = req.query

    let ArrQuery = [] //array que contiene loos precios por lo que se va a filtrar
    let newArr = []// array que contiene todos los productos recibidos por body
    await req.body.forEach((e) => newArr = [...newArr, ...e])

    if(Array.isArray(precios)){//condicion que verifica quelos parametros pasados sean mas de uno, en ese caso los valores pasan a ser array en caso de ser uno es un string
        precios.forEach((e) => {
            let ele = e.split('-')
            ArrQuery.push(ele)
        })
    }else{
        let ele = precios.split('-')
        ArrQuery.push(ele)
    }
   
    let ArrFinal = [] //array que contendra los productos filtrados
    try{
        await ArrQuery.forEach((e) => {
           let ese = newArr.filter((ele) => ele.precio > e[0] && ele.precio < e[1] )
           ArrFinal.push(...ese)
        })
        let ArrayPaginado = await paginar(ArrFinal)
        console.log(ArrFinal)
        res.status(200).json(ArrayPaginado)
    }catch(err){
        res.status(400).send('err.message')
    }
})

// ========================================== OBTENER UN PRODUCTO =====================================================

rutaProducto.get('/:id', async (req, res) => {
    const {id} = req.params
    try{
        let data = await producto.findOne({where: {id}})
        res.status(200).json(data)
    }
    catch(err){
        res.status(400).send(err)
    }
})

// ========================================== ELIMINAR UN PRODUCTO =====================================================

rutaProducto.delete('/:id', async (req, res) => {
    const {id} = req.params
    producto.destroy({
        where:{
            id: id
        }
    })
    try{
        res.status(200).send('borrado exitoso')
    }catch(err){
        res.status(400).send(err)
    }
})

// ========================================= BORRADO LOGICO ===========================================================


rutaProducto.put('/descontar-stock/:id', async (req, res) => {
    const {id} = req.params
    const {cantidad} = req.body
    try{
        let data_producto = await producto.findOne({where: {id}})
        const  {nombre, precio, categoria, descripcion, marca, stock, img, precio_anterior} = data_producto

        let stock_actual = stock - cantidad

        const descontar = await producto.update({
            nombre, 
            precio, 
            categoria, 
            descripcion, 
            marca, 
            stock : stock_actual,
            precio_anterior,
            img, 
            display: Math.sign(stock_actual) === 1 ? true : false
        } , { where: { id } })
        res.status(200).send('¡ stock actualizado !')
    }
    catch(err){
        res.status(400).send(err)
    }
})




module.exports = rutaProducto