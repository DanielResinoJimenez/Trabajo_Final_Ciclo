const Cuenta = require("../database/models/Cuenta");

// Funciones de consultas en la base de datos.

// Obtener todos los productos
const getAllCuentas = async () => {
    try {
        return await Cuenta.findAll();
    } catch (error) {
        console.log("Error en getAllMaquinas:", error);
        throw error;
    }
}

module.exports = { getAllCuentas };