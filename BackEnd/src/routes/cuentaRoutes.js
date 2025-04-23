const cuentaRoutes = require("express").Router();
const maquinasController = require("../controllers/cuentaController");

// Necesitamos importar estos dos módulos de node para poder subir imágenes a nuestra base de datos.
const path = require("path");
const multer = require("multer")

// Rutas de la API de cuentas

cuentaRoutes.get("/", maquinasController.getAllCuentas);

// Exportamos el router de cuentas

module.exports = cuentaRoutes;