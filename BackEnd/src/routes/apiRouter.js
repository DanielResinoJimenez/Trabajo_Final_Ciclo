// Creamos el Router de nuestra api

const apiRouter = require('express').Router();

// Variables de la API

const productosRoutes = require('./productoRoutes');
const maquinasRoutes = require('./maquinaRoutes');
const solicitudRoutes = require('./solicitudRoutes');
const userRouter = require('./usuarioRoutes');
const cuentaRoutes = require('./cuentaRoutes');
const gananciaRoutes = require('./gananciaRoutes');

// Rutas de la API

apiRouter.use('/productos', productosRoutes);
apiRouter.use('/maquinas', maquinasRoutes);
apiRouter.use('/solicitudes', solicitudRoutes);
apiRouter.use('/usuarios', userRouter);
apiRouter.use('/cuenta', cuentaRoutes);
apiRouter.use('/ganancias', gananciaRoutes);

module.exports = apiRouter;
