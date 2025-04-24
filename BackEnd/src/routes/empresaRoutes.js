const empresaRoutes = require("express").Router();
const cuentaController = require("../controllers/empresaController");

// Rutas de la API de cuentas

empresaRoutes.get("/", cuentaController.getAllEmpresas);
empresaRoutes.get("/:email", cuentaController.getOneEmpresa)

// Exportamos el router de cuentas

module.exports = empresaRoutes;