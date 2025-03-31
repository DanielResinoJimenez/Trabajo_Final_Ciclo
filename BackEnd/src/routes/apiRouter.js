// Creamos el Router de nuestra api

const apiRouter = require('express').Router();

// Variables de la API

const productosRoutes = require('./productoRoutes');
const maquinasRoutes = require('./maquinaRoutes');

// Rutas de la API

apiRouter.use('/productos', productosRoutes);
apiRouter.use('/maquinas', maquinasRoutes);

module.exports = apiRouter;
