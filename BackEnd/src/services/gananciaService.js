const Ganancia = require("../database/models/Ganancia");

// Funciones de consultas en la base de datos.

// Obtener todos los productos
const getAllGanancias = async () => {
    try {
        return await Ganancia.findAll();
    } catch (error) {
        console.log("Error en getAllGanancias:", error);
        throw error;
    }
}

// Obtener ganancia por id 

const getGananciaByIdCuenta = async (id) => {
    try {
        const ganancia = await Ganancia.findOne({ where: { id_cuenta: id } });
        return ganancia;
    } catch (error) {
        console.error("Error obteniendo la ganancia por ID de cuenta:", error);
        throw error;
    }
}

// Insertar un nuevo producto

const createGanancia = async (body) => {
    try {
        return await Ganancia.create(body);
    } catch (error) {
        console.error("Error creando la ganancia:", error);
        throw error;
    }
};

// Modificar un producto

const putGanancia = async (newGanancia, id_ganancia) => {
    try {
        const updated = await Ganancia.update(newGanancia, { where: { id_ganancia } });
        return updated[0] ? "Ganancia actualizada correctamente" : "No se encontró la Ganancia";
    } catch (error) {
        console.error("Error actualizando la ganancia:", error);
        throw error;
    }
};

// Eliminar un producto

const deleteGanancia = async (id) => {
    try {
        const deleted = await Ganancia.destroy({ where: { id_ganancia: id } });
        return deleted ? "Ganancia eliminada correctamente" : "No se encontró la ganancia";
    } catch (error) {
        console.error("Error eliminando la ganancia:", error);
        throw error;
    }
};

module.exports = { getAllGanancias, getGananciaByIdCuenta, createGanancia, putGanancia, deleteGanancia };