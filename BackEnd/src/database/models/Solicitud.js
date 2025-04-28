const sequelize = require("../db");

const {Model, DataTypes} = require("sequelize");

class Solicitud extends Model {}

Solicitud.init({
    id_solicitud: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'id_usuario'
        }
    },
    id_maquina:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'maquina',
            key: 'id_maquina'
        }
    },
    fecha_solicitud: {
        type: DataTypes.DATE,
        allowNull: false
    },
    nombre_solicitante: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion_establecimiento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono_solicitante: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['pendiente', 'aprobada', 'rechazada']]
        }
    },
    },
    {
        sequelize,
        modelName: 'solicitud',
        tableName: 'solicitud',
        timestamps: false
    }
);

module.exports = Solicitud;