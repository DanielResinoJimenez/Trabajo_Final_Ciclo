const Services = require("../services/productoService");

// Funciones de controlador para las rutas de la API

// Obtener todos los productos

const getAllProductos = async (req, res) => {
    try {
        const productos = await Services.getAllProductos();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Insertar un nuevo producto

const createProducto = async (req, res) => {
    try {
        const producto = await Services.createProducto(req.body);
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modificar un producto

const putProducto = async (req, res) => {
    try {
        const updated = await Services.putProducto(req.body, req.params.id);
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un producto

const deleteProducto = async (req, res) => {
    try {
        const deleted = await Services.deleteProducto(req.params.id);
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Exportamos las funciones

module.exports = { getAllProductos, createProducto, putProducto, deleteProducto };
