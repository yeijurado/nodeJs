// Configuración del servidor

//imports de modulos
const express = require ('express');
const bodyParser = require('body-parser');

// imports de archivos
const routes = require('./routes/api');
const app = express();

app.use(bodyParser.urlencoded( {
    extended: false
}));

app.use(bodyParser.json( {
    parameterLimit: 100000,
    limit: '50mb',
    extended: false
}))

app.use('', routes);

// Exportamos

module.exports = app;