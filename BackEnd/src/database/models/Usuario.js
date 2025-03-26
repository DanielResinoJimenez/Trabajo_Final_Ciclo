const sequelize = require("../db")

const { Model, DataTypes } = require("sequelize")

class Usuario extends Model {}

Usuario.init({
    id_usuario: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        validate: {
            isIn: {
                args: [['user', 'admin']],  // Solo estos valores son válidos
                msg: "El rol debe ser 'user' o 'admin'"
            }
        }
    }
},{
    sequelize,
    modelName: "usuario",
    tableName: "usuario",
    timestamps: false
})

module.exports = Usuario;