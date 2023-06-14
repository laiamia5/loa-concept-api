const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('usuario', {
        id:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        nombre:{
            type: DataTypes.STRING
        },
        apellido:{
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.TEXT,
            allowNull: false, //es obligatorio y unico!!!
        },
        contraseña:{
            type: DataTypes.STRING,
        },
        dni: {
            type: DataTypes.INTEGER,
            allowNull: false, //es obligatorio
        },
        telefono: {
            type: DataTypes.STRING
        },
        direccion_provincia : {
            type: DataTypes.TEXT
        },
        direccion_localidad : {
            type: DataTypes.TEXT
        },
        direccion_calles : {
            type: DataTypes.TEXT
        },
        direccion_barrio:  {
            type: DataTypes.TEXT
        },
        registrado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        admin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        codigo_postal:{
            type: DataTypes.STRING
        }
    },{timestamps: false})
}