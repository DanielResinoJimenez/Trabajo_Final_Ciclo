const sequelize = require("../db");

const {Model, DataTypes} = require('sequelize');

class PedidoMaquina extends Model {}

PedidoMaquina.init({
    id_pedido_maquina:{
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
    id_maquina:{
        type: DataTypes.INTEGER,
        references: {
            model: 'maquina',
            key: 'id_maquina',
        },
        allowNull: false,
    },
},{
    sequelize,
    modelName: 'pedido_maquina',
    tableName: 'pedido_maquina',
    timestamps: false,
});

module.exports = PedidoMaquina;