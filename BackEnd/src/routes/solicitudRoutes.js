const solicitudRoutes = require("express").Router();
const solicitudController = require("../controllers/solicitudController");

// Rutas de la API de productos

solicitudRoutes.get("/", solicitudController.getAllSolicitudes);
solicitudRoutes.post("/", solicitudController.createSolicitud);
solicitudRoutes.put("/:id", solicitudController.updateSolicitud);
solicitudRoutes.get("/pendientes", solicitudController.getSolicitudesPendientes);
solicitudRoutes.get("/denegadas", solicitudController.getSolicitudesDenegadas);
solicitudRoutes.post("/existente", solicitudController.getSolicitudExistente);

// Exportamos el router de productos

module.exports = solicitudRoutes;