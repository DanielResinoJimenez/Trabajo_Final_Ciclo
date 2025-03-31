const maquinasRoutes = require("express").Router();
const maquinasController = require("../controllers/maquinaController");

// Necesitamos importar estos dos módulos de node para poder subir imágenes a nuestra base de datos.
const path = require("path");
const multer = require("multer")

// Rutas de la API de productos

maquinasRoutes.get("/", maquinasController.getAllMaquinas);
maquinasRoutes.get("/stock", maquinasController.getMaquinasStock)
maquinasRoutes.get("/:categoria", maquinasController.getMaquinaByMarca);
maquinasRoutes.post("/", maquinasController.createMaquina);
maquinasRoutes.put("/:id", maquinasController.putMaquina);
maquinasRoutes.delete("/:id", maquinasController.deleteMaquina);

// Función para subir la imagen en binario a la base de datos
// La función para hacerlo es la siguiente:
// Configuración para almacenar en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Petición post para subir una imagen de una muestra específica

maquinasRoutes.post("/create", upload.single("imagen"), maquinasController.createMaquinaImagen);

// Exportamos el router de productos

module.exports = maquinasRoutes;