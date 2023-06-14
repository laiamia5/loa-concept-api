const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('info', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        direccion : {
            type : DataTypes.STRING,
        },
        instagram: {
            type : DataTypes.STRING,
        },
        facebook: {
            type : DataTypes.STRING,
        },
        numero:{
            type : DataTypes.STRING,
        },
        email:{
            type : DataTypes.STRING,
        },
        avisos:{
            type : DataTypes.TEXT,
        },
        descripcion: {
            type : DataTypes.TEXT,
        },
        envio: {
            type: DataTypes.INTEGER,
        },
        cvu: {
            type : DataTypes.TEXT,
        },
        alias: {
            type : DataTypes.TEXT,
        },
        nombre_cuenta_bancaria : {
            type : DataTypes.TEXT,
        }
    },{timestamps: false})
}