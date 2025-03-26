const sequelize = require("../db");

const {Model, DataTypes} = require("sequelize");

class Cuenta extends Model {}

Cuenta.init({
    id_cuenta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    id_empresa: {
        type: DataTypes.INTEGER,
        references: {
            model: "empresa",
            key: "id_empresa",
        },
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    saldo: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    ultimo_movimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},{
    sequelize,
    modelName: "cuenta",
    tableName: "cuenta",
    timestamps: false,
});