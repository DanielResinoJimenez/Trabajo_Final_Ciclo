const perdidaRoutes = require("express").Router();
const perdidaController = require("../controllers/perdidaController");

// Rutas de la API de productos

perdidaRoutes.get("/", perdidaController.getAllMaquinas);
perdidaRoutes.post("/", perdidaController.createGanancia);
perdidaRoutes.put("/:id", perdidaController.putGanancia);
perdidaRoutes.delete("/:id", perdidaController.deleteGanancia);

// Exportamos el router de productos

module.exports = perdidaRoutes;