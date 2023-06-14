const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('ofertas', {
        id:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        nombre : {
            type : DataTypes.STRING,
        },
        email : {
            type: DataTypes.TEXT,
        }
    })
}