'use strict'
// Configuración del servidor
const mongoose = require('mongoose');
const port = 3700;

//Importamos la funcionalidad de app.js
const app = require('./app');

// set up conection 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/curso',{ 
    useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Conexión a la base de datos establecida con éxito");
        
        // Creating the server
        var server = app.listen(port, () => {
            console.log("Servidor corriendo correctamente en la url: http://localhost:" + port);
        });

    })
    .catch(err => console.log(err));


   


 /* Este código se hizo en la clase 2
 app.listen(port, () => {
 console.log("Servidor de ejemplo ejecutando en " + port);   
 */