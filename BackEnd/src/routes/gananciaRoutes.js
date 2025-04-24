const gananciaRouter = require("express").Router();
const gananciaController = require("../controllers/gananciaController");

// Rutas de la API de productos

gananciaRouter.get("/", gananciaController.getAllGanancias);
gananciaRouter.get("/:id", gananciaController.getAllGananciasByIdCuenta)
gananciaRouter.post("/", gananciaController.createGanancia);
gananciaRouter.put("/:id", gananciaController.putGanancia);
gananciaRouter.delete("/:id", gananciaController.deleteGanancia);

// Exportamos el router de productos

module.exports = gananciaRouter;