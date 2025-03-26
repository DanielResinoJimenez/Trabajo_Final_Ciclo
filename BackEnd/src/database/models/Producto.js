const sequelize = require("../db");

const {Model, DataTypes} = require('sequelize');

class Producto extends Model {}

Producto.init({
    id_producto:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagen:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoria:{
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    sequelize,
    modelName: 'producto',
    tableName: 'producto',
    timestamps: false,
});