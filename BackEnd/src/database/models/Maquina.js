const sequelize = require("../db");

const { Model, DataTypes } = require("sequelize");

class Maquina extends Model { }

Maquina.init({
    id_maquina: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        validate: {
            isIn: {
                args: [['En stock', 'En servicio', 'En mantenimiento']],
                msg: 'El estado debe ser En stock, En servicio o En mantenimiento'
            }
        }
    },
    reposicion: {
        type: DataTypes.STRING,
        validate: {
            isIn: {
                args: [['S', 'N']],
                msg: 'La reposición debe ser S o N'
            }
        }
    },
    nombre_establecimiento: {
        type: DataTypes.STRING,
        allowNull: true
    },
    direccion_establecimiento: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imagen: {
        type: DataTypes.BLOB.apply('long'),
        allowNull: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: "maquina",
    tableName: "maquina",
    timestamps: false
});

module.exports = Maquina;