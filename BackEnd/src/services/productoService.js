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

// Obtener productos por categoría

const getProductByCategory = async (categoria) => {
    try {
        return await Producto.findAll({
            where: {categoria: categoria}
        })
    } catch (error) {
        console.log("Error en getProductByCategory:", error);
        return error;
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

// Subir una nueva imagen

const createProductoImagen = async (imagenData) => {
    try {
        return await Producto.update(
            { imagen: imagenData.imagen, tipo: imagenData.tipo }, // Valores a actualizar
            { where: { id_producto: imagenData.id_producto } } // Condición para identificar el producto
        );
    } catch (error) {
        throw new Error("Error al actualizar la imagen: " + error.message);
    }
}

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

module.exports = { getAllProductos, getProductByCategory, createProducto, createProductoImagen, putProducto, deleteProducto };  
