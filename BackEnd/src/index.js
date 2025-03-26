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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Importamos el enrutador de la API

// Establecemos una ruta inicial para conectar hacer consultas en la api

// Hacemos el proceso de conexión con la base de datos