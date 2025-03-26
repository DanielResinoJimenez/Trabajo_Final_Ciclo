const sequelize = require ("../db");

const {Model, DataTypes} = require("sequelize");

class Empresa extends Model {}

Empresa.init({
    id_empresa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    propietario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    sequelize,
    modelName: "empresa",
    tableName: "empresa",
    timestamps: false,
});

module.exports = Empresa;