const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('producto', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        precio:{
            type: DataTypes.INTEGER
        },
        precio_anterior:{
            type: DataTypes.INTEGER
        },
        categoria:{
            type: DataTypes.STRING
        },
        descripcion:{
            type: DataTypes.TEXT //poner cada caracteristica y luego coma
        },
        marca: {
            type: DataTypes.STRING
        },
        stock:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        img: {
            type: DataTypes.TEXT
        },
        display: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        colores: {
            type: DataTypes.TEXT 
        },
        talles:{
            type: DataTypes.TEXT 
        }

    },{timestamps: false})
}