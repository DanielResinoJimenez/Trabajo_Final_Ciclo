const perdidaRoutes = require("express").Router();
const perdidaController = require("../controllers/perdidaController");

// Rutas de la API de productos

perdidaRoutes.get("/", perdidaController.getAllPerdidas);
perdidaRoutes.get("/:id", perdidaController.getPerdidaByIdCuenta)
perdidaRoutes.post("/", perdidaController.createPerdida);
perdidaRoutes.put("/:id", perdidaController.putPerdida);
perdidaRoutes.delete("/:id", perdidaController.deletePerdida);

// Exportamos el router de productos

module.exports = perdidaRoutes;