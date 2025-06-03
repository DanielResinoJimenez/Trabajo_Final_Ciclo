// Inicializamos las variables de los modulos.

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

// Importamos la conexión con la base de datos.

const sequelize = require('./database/db');

// Importamos las asociaciones para que se generen las tablas y la relación entre ellas en la base de datos.

require('./database/associations');

// Conversión a JSON indispensable para el funcionamiento correcto de nuestra api

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

// Importamos el enrutador de la API

const apiRouter = require('./routes/apiRouter');

// Establecemos una ruta inicial para conectar hacer consultas en la api

app.use('/api', apiRouter);

// Hacemos el proceso de conexión con la base de datos

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    sequelize
    .sync({ force: false })
    .then(() => {
        console.log('Sincronizado con la base de datos MasCoffee');
    })
    .catch((error) => {
        console.log('Se ha producido un error', error);
    });
});