const Empresa = require("../database/models/Empresa");

// Funciones de consultas en la base de datos.

// Obtener todos los productos
const getAllEmpresas = async () => {
    try {
        return await Empresa.findAll();
    } catch (error) {
        console.log("Error en getAllMaquinas:", error);
        throw error;
    }
}

const getOneEmpresa = async(email) => {
    try {
        return await Empresa.findOne({where: {email: email}});
    } catch (error) {
        console.log("Error en getOneEmpresa:", error);
        throw error;
    }
}

module.exports = { getAllEmpresas, getOneEmpresa };