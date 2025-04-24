const sequelize = require("../db");

const {Model, DataTypes} = require("sequelize");

class Perdida extends Model {}

Perdida.init({
    id_perdida: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    id_cuenta: {
        type: DataTypes.INTEGER,
        references: {
            model: "cuenta",
            key: "id_cuenta",
        },
        allowNull: false,
    },
    motivo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "perdida",
    tableName: "perdida",
    timestamps: false,
});

module.exports = Perdida;