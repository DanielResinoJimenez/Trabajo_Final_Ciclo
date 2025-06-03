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
            where: { marca: marca }
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
        const result = await Maquina.update(
            { imagen: imagenData.imagen, tipo: imagenData.tipo }, // Valores a actualizar
            { where: { id_maquina: imagenData.id_maquina } } // Condición para identificar la maquina
        );
        console.log("Resultado del update:", result); // debería ser [1] si actualiza 1 fila
        return result;
    } catch (error) {
        throw new Error("Error al actualizar la imagen: " + error.message);
    }
}

// Modificar un producto

const putMaquina = async (newProducto, id_maquina) => {
    try {
        const updated = await Maquina.update(newProducto, { where: { id_maquina } });
        return {
            success: updated > 0,
            message: updated[0]
                ? "Máquina modificada correctamente"
                : "No se encontró la máquina"
        };
    } catch (error) {
        console.error("Error actualizando el producto:", error);
        throw error;
    }
};

// La máquina no se borra como tal, sino que se actualiza su estado a "Eliminada" para mantener la integridad de los datos y evitar problemas de referencia en la base de datos.

const deleteMaquina = async (id) => {
    try {
        const deleted = await Maquina.update({ estado: "Eliminada" }, { where: { id_maquina: id } });

        return {
            success: deleted > 0,
            message: deleted
                ? "Máquina eliminada correctamente"
                : "No se encontró la máquina"
        };
    } catch (error) {
        console.error("Error eliminando el producto:", error);
        return {
            success: false,
            message: "Error eliminando la máquina",
            error: error.message
        };
    }
};


module.exports = { getAllMaquinas, getMaquinasStock, getMaquinaByMarca, createMaquina, createMaquinaImagen, putMaquina, deleteMaquina };