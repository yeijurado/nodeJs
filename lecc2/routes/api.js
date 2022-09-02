'use strict'
const express = require('express');
const api = express.Router();
const { body } = require('express-validator');

var WelcomeController = require('../controllers/welcome');
var AlumnosController = require('../controllers/alumnos');
let ProfesoresController = require('../controllers/profesores');
let AuthController = require('../controllers/auth');


let userProtectUrl = require('../middlewares/authUser').userProtectUrl;

// crear cada una de nuestras rutas 

// endpoints for Usuarios
api.get("/", WelcomeController.welcome);
api.get("/alumnos", AlumnosController.alumnos);
api.get("/alumno/:n_lista", AlumnosController.alumno);

// validating the token before creating the student
api.post("/alumno", userProtectUrl, [
    body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
] ,AlumnosController.crear_alumno);


/* antes de implementar login con jwt
api.post("/alumno", [
    body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
] ,AlumnosController.crear_alumno);
*/

api.put("/alumno/:n_cuenta", [
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.update_alumno);

api.delete("/alumno/:n_cuenta", AlumnosController.delete_alumno);

// endpoints for profesores

api.get("/profesores", ProfesoresController.profesores);
api.get("/profesores/:n_lista", ProfesoresController.profesor);

api.post("/profesor", userProtectUrl, [
    body('identificacion').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty(),
    body('especialidad').not().isEmpty()
], ProfesoresController.crear_profesor);

api.put("/profesor/:identificacion", userProtectUrl, [
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty(),
    body('especialidad').not().isEmpty()
], ProfesoresController.update_profesor);

api.delete("/profesor/:identificacion", userProtectUrl, ProfesoresController.delete_profesor);

// endpoints for login - logout
api.post("/login", [
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty()
], AuthController.login);

api.post("/logout", userProtectUrl, AuthController.logout);

module.exports = api;

/* Metodos cuando estaban antes en welcome controller
api.get("/alumno", WelcomeController.alumno);

api.post("/alumno", WelcomeController.crear_alumno);

api.put("/alumno", WelcomeController.actualizar_alumno);

api.delete("/alumno", WelcomeController.eliminar_alumno);


module.exports = api;
*/

/* antes sin incluir los controladores estaba así...
api.get("/", (req,res) => {
    console.log("Get ejecutado en raiz");
    res.send("Mi primer debug");
});

api.get("/alumnos", (req, res) => {
    res.send("Mi listado de alumnos");
});

api.get("/alumno", (req, res) => {
    
    let cal1 = 10;
    let cal2 = 8;
    let cal3 = 8;
    let final = (cal1 + cal2 + cal3) / 3;

    console.log(final);
    
    res.send("La calificaciòn final del alumno Ostyn Dario es: " + final);
});

api.post("/alumno", (req, res) => {
    res.send("creamos un alumno");
});

api.put("/alumno", (req, res) => {
    res.send("actualizamos un alumno");
});

api.delete("/alumno", (req, res) => {
    res.send("borramos o eliminamos un alumno");
});

*/









