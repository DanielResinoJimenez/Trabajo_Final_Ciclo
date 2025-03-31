const Maquina = require("../database/models/Maquina");

// Funciones de consultas en la base de datos.

// Obtener todos los productos
const getAllMaquinas = async () => {
    try {
        return await Maquina.findAll();
    } catch (error) {
        console.log("Error en getAllMaquinas:", error);
        throw error;
    }
}

const getMaquinasStock = async () => {
    try {
        return await Maquina.findAll({
            where: { estado: "En stock" }
        })
    } catch (error) {
        console.log("Error en getMaquinasStock:", error);
        return error;
    }
}

// Obtener productos por categoría

const getMaquinaByMarca = async (marca) => {
    try {
        return await Maquina.findAll({
            where: {marca: marca}
        })
    } catch (error) {
        console.log("Error en getProductByCategory:", error);
        return error;
    }
}

// Insertar un nuevo producto

const createMaquina = async (body) => {
    try {
        return await Maquina.create(body);
    } catch (error) {
        console.error("Error creando el producto:", error);
        throw error;
    }
};

// Subir una nueva imagen

const createMaquinaImagen = async (imagenData) => {
    try {
        return await Maquina.update(
            { imagen: imagenData.imagen, tipo: imagenData.tipo }, // Valores a actualizar
            { where: { id_producto: imagenData.id_producto } } // Condición para identificar el producto
        );
    } catch (error) {
        throw new Error("Error al actualizar la imagen: " + error.message);
    }
}

// Modificar un producto

const putMaquina = async (newProducto, id_maquina) => {
    try {
        const updated = await Maquina.update(newProducto, { where: { id_maquina } });
        return updated[0] ? "Maquina actualizada correctamente" : "No se encontró la maquina";
    } catch (error) {
        console.error("Error actualizando el producto:", error);
        throw error;
    }
};

// Eliminar un producto

const deleteMaquina = async (id) => {
    try {
        const deleted = await Maquina.destroy({ where: { id_maquina: id } });
        return deleted ? "Máquina eliminada correctamente" : "No se encontró la máquina";
    } catch (error) {
        console.error("Error eliminando el producto:", error);
        throw error;
    }
};

module.exports = { getAllMaquinas, getMaquinasStock, getMaquinaByMarca, createMaquina, createMaquinaImagen, putMaquina, deleteMaquina };