const cuentaRoutes = require("express").Router();
const maquinasController = require("../controllers/cuentaController");

// Rutas de la API de cuentas

cuentaRoutes.get("/", maquinasController.getAllCuentas);

// Exportamos el router de cuentas

module.exports = cuentaRoutes;