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
            model: 'Usuario',
            key: 'id_usuario'
        }
    },
    id_maquina:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Maquina',
            key: 'id_maquina'
        }
    },
    fecha_solicitud: {
        type: DataTypes.DATE,
        allowNull: false
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
        modelName: 'Solicitud',
        tableName: 'Solicitud',
        timestamps: false
    }
);
