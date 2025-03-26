const sequelize = require("../db");

const { Model, DataTypes } = require("sequelize");

class Factura extends Model {}

Factura.init({
    id_factura: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    id_pedido: {
        type: DataTypes.INTEGER,
        references: {
          model: "pedido", 
          key: 'id_pedido',      
        },
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
},{
    sequelize,
    modelName: "factura",
    tableName: "factura",
    timestamps: false
})

module.exports = Factura;