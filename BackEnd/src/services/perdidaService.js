const Perdida = require("../database/models/Perdida");

// Funciones de consultas en la base de datos.

// Obtener todos los productos
const getAllPerdidas = async () => {
    try {
        return await Perdida.findAll();
    } catch (error) {
        console.log("Error en getAllPerdidas:", error);
        throw error;
    }
}

// Insertar un nuevo producto

const createPerdida = async (body) => {
    try {
        return await Perdida.create(body);
    } catch (error) {
        console.error("Error creando la Perdida:", error);
        throw error;
    }
};

// Modificar un producto

const putPerdida = async (newPerdida, id_perdida) => {
    try {
        const updated = await Perdida.update(newPerdida, { where: { id_perdida } });
        return updated[0] ? "Perdida actualizada correctamente" : "No se encontró la Perdida";
    } catch (error) {
        console.error("Error actualizando la Perdida:", error);
        throw error;
    }
};

// Eliminar un producto

const deletePerdida = async (id) => {
    try {
        const deleted = await Perdida.destroy({ where: { id_Perdida: id } });
        return deleted ? "Perdida eliminada correctamente" : "No se encontró la Perdida";
    } catch (error) {
        console.error("Error eliminando la Perdida:", error);
        throw error;
    }
};

module.exports = { getAllPerdidas, createPerdida, putPerdida, deletePerdida };