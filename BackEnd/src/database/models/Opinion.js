const sequelize = require("../db");

const { Model, DataTypes } = require("sequelize");

class Opinion extends Model {}

Opinion.init({
    id_opinion: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuario',
            key: 'id_usuario'
        },
        allowNull: false,
    },
    opinion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valoracion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    }
},{
    sequelize,
    modelName: "opinion",
    tableName: "opinion",
    timestamps: false
})

module.exports = Opinion;