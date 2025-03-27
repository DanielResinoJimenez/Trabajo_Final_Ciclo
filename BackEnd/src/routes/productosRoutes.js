const productosRoutes = require("express").Router();
const productosController = require("../controllers/productoController");

// Necesitamos importar estos dos módulos de node para poder subir imágenes a nuestra base de datos.
const path = require("path");
const multer = require("multer")

// Rutas de la API de productos

productosRoutes.get("/", productosController.getAllProductos);
productosRoutes.post("/", productosController.createProducto);
productosRoutes.put("/:id", productosController.putProducto);
productosRoutes.delete("/:id", productosController.deleteProducto);

// Función para subir la imagen en binario a la base de datos
// La función para hacerlo es la siguiente:
// Configuración para almacenar en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Petición post para subir una imagen de una muestra específica

productosRoutes.post("/create", upload.single("imagen"), productosController.createProductoImagen);

// Exportamos el router de productos

module.exports = productosRoutes;