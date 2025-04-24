const cuentaRoutes = require("express").Router();
const cuentaController = require("../controllers/cuentaController");

// Rutas de la API de cuentas

cuentaRoutes.get("/", cuentaController.getAllCuentas);
cuentaRoutes.get("/:id", cuentaController.getOneCuenta)

// Exportamos el router de cuentas

module.exports = cuentaRoutes;