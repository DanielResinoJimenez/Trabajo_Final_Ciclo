const sequelize = require("../db");

const {Model, DataTypes} = require('sequelize');

class PedidoProducto extends Model {}

PedidoProducto.init({
    id_pedido_producto:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    id_pedido:{
        type: DataTypes.INTEGER,
        references: {
            model: 'pedido',
            key: 'id_pedido',
        },
        allowNull: false,
    },
    id_producto:{
        type: DataTypes.INTEGER,
        references: {
            model: 'producto',
            key: 'id_producto',
        },
        allowNull: false,
    },
    cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},{
    sequelize,
    modelName: 'pedido_producto',
    tableName: 'pedido_producto',
    timestamps: false,
});

module.exports = PedidoProducto;