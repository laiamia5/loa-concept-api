const {producto, compra} = require('../db')
// ===========================PAGINAR=====================================
const paginar = async (array) => {
    let productos = array
    let position = 0
    let result = []
        for (let i = 0; i < Math.ceil(productos.length / 9); i++) {
            if (!i) result.push(productos.slice(0,9))
            
            else result.push(productos.slice(position, position + 9))
            position += 9
        }
    return result
} 




// let totalArr = []
// let newArr = []
// let vueltas = 0
// let recorrido = 0

// for(const i of array){
//     await newArr.push(i) 
//     recorrido++
//     if(vueltas === 8 || recorrido == array.length - 1){
//         await totalArr.push(newArr)
//         newArr.length === 9 ? newArr = [] : newArr
//         vueltas = 0
//     }else{
//         vueltas++
//     }
// }
// return totalArr

const setearCompra = async (idCompra) => {
    try{
        const cambiarEstadoCompra = await compra.update( { pago: 'pagado'} , { where: { id: idCompra } })
        res.status(200).json(cambiarEstadoCompra)
    }catch(err){
        res.status(400).send(err.message)
    }
}


module.exports = {paginar, setearCompra}
