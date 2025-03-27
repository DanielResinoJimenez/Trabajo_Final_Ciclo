const Producto = require("../database/models/Producto");

// Funciones de consultas en la base de datos.

// Obtener todos los productos
const getAllProductos = async () => {
    try {
        return await Producto.findAll();
    } catch (error) {
        console.log("Error en getAllProductos:", error);
        throw error;
    }
}

// Insertar un nuevo producto

const createProducto = async (body) => {
    try {
        return await Producto.create(body);
    } catch (error) {
        console.error("Error creando el producto:", error);
        throw error;
    }
};

// Modificar un producto

const putProducto = async (newProducto, id_producto) => {
    try {
        const updated = await Producto.update(newProducto, { where: { id_producto } });
        return updated[0] ? "Producto actualizado correctamente" : "No se encontró el producto";
    } catch (error) {
        console.error("Error actualizando el producto:", error);
        throw error;
    }
};

// Eliminar un producto

const deleteProducto = async (id) => {
    try {
        const deleted = await Producto.destroy({ where: { id_producto: id } });
        return deleted ? "Producto eliminado correctamente" : "No se encontró el producto";
    } catch (error) {
        console.error("Error eliminando el producto:", error);
        throw error;
    }
};

// Exportar las funciones

module.exports = { getAllProductos, createProducto, putProducto, deleteProducto };  
