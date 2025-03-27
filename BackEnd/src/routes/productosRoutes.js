const productosRoutes = require("express").Router();
const productosController = require("../controllers/productoController");

// Rutas de la API de productos

productosRoutes.get("/", productosController.getAllProductos);
productosRoutes.post("/", productosController.createProducto);
productosRoutes.put("/:id", productosController.putProducto);
productosRoutes.delete("/:id", productosController.deleteProducto);

// Exportamos el router de productos

module.exports = productosRoutes;