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
            model: "Cuenta",
            key: "id_cuenta",
        },
        allowNull: false,
    },
    motivo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    monto: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Ganancia",
    tableName: "Ganancia",
    timestamps: false,
});