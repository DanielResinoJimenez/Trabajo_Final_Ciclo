// Creamos el Router de nuestra api

const apiRouter = require('express').Router();

// Variables de la API

const productosRoutes = require('./productosRoutes');
const maquinasRoutes = require('./maquinasRoutes');

// Rutas de la API

apiRouter.use('/productos', productosRoutes);
apiRouter.use('/maquinas', maquinasRoutes);

module.exports = apiRouter;
