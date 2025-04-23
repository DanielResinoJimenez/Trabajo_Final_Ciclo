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

// Obtener productos por categoría

const getProductByCategory = async (req, res) => {
    try{
        const productos = await Services.getProductByCategory(req.params.categoria);
        res.status(200).json(productos);
    }catch(error){
        res.status(500).json({ error: error.message })
    }
}

// Insertar un nuevo producto

const createProducto = async (req, res) => {
    try {
        const producto = await Services.createProducto(req.body);
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Insertar una nueva imagen

const createProductoImagen = async (req, res) => {
    try {
        console.log('req.file:', req.file);  // Agregar log para ver si el archivo está presente
        console.log('req.body:', req.body);  // Ver el contenido de req.body
        // Obtener id_muestra desde req.body, ya que lo estás enviando en formData
        const id_producto = req.body.id_producto;  

        if (!id_producto) {
            return res.status(400).json({ message: "id_producto no proporcionado" });
        }

        const imagenBuffer = req.file.buffer;  // Obtener el buffer de la imagen
        const mimeType = req.file.mimetype;    // Obtener el tipo MIME de la imagen

        const imagenData = {
            id_producto,  // Asociar la imagen con el id
            imagen: imagenBuffer,
            tipo: mimeType,
        };

        const createdImage = await Services.createProductoImagen(imagenData);
        res.status(201).json(createdImage);
        
    } catch (error) {
        console.error('Error al crear la imagen:', error);
        res.status(500).json({ message: error.message });
    }
}

// Modificar un producto

const putProducto = async (req, res) => {
    try {
        console.log(req.body)
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

module.exports = { getAllProductos, getProductByCategory, createProducto, createProductoImagen, putProducto, deleteProducto };
