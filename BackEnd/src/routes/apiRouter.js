// Creamos el Router de nuestra api

const apiRouter = require('express').Router();

// Variables de la API

const productosRoutes = require('./productosRoutes');

// Rutas de la API

apiRouter.use('/productos', productosRoutes);

module.exports = apiRouter;
