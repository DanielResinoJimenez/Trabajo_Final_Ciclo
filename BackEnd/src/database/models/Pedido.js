const sequelize = require("../db");

const { Model, DataTypes } = require("sequelize");

class Pedido extends Model {}

Pedido.init({
    id_pedido: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    id_usuario: { // FK
        type: DataTypes.INTEGER,
        references: {
          model: Usuario, 
          key: 'id_usuario',      
        },
      },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pendiente',
        validate: {
            isIn: {
                args: [['pendiente', 'aceptado', 'enviado', 'recibido']],  // Solo estos valores son válidos
                msg: "El estado debe ser 'pendiente', 'aceptado', 'enviado' o 'recibido'"
            }
        }
    }
},{
    sequelize,
    modelName: "pedido",
    tableName: "pedido",
    timestamps: false
})