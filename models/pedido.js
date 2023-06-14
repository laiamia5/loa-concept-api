const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('pedido', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cantidad: {
            type : DataTypes.INTEGER,
        },
        talle:{
            type: DataTypes.ENUM('XS', 'S', 'M', 'L', 'XL'),
        },
        color:{
            type : DataTypes.STRING,
        }   
    },{timestamps: false})
}