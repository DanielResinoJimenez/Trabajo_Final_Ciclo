const solicitudRoutes = require("express").Router();
const solicitudController = require("../controllers/solicitudController");
const multer = require('multer');

// Configuramos el multer para guardar los pdfs
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });


// Rutas de la API de productos

solicitudRoutes.get("/", solicitudController.getAllSolicitudes);
solicitudRoutes.post("/", upload.single('documento'), solicitudController.createSolicitud);
solicitudRoutes.put("/:id", solicitudController.updateSolicitud);
solicitudRoutes.get("/pendientes", solicitudController.getSolicitudesPendientes);
solicitudRoutes.get("/denegadas", solicitudController.getSolicitudesDenegadas);
solicitudRoutes.post("/existente", solicitudController.getSolicitudExistente);
solicitudRoutes.delete("/:id", solicitudController.deleteSolicitud);

// Exportamos el router de productos

module.exports = solicitudRoutes;