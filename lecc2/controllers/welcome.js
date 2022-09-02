'use strict'

// dar de alta un controlador

var controller = {
    welcome: function(req, res) {
        console.log("Welcome to the jungle");
        res.send("Welcome home NYC");
    },

    /* Cambiamos esto en la clase 4 parte 2
    alumnos: function(req, res) {
        res.send("Mi listado de alumnos");
    },

    alumno: function(req, res) {
        let cal1 = 5;
        let cal2 = 7;
        let cal3 = 3;
        let final = (cal1 + cal2 + cal3) / 3;

        console.log(final);

        if (final < 6) {
            return res.status(400).json({
                status: 400,
                cal_final: final
            })
        } else {
            return res.status(200).json({
                status: 200,
                cal_final: final
            })
        }

        //res.send("La calificaciòn final del alumno Ostyn Dario es: " + final);

    },

    crear_alumno: function(req, res) {
        
        let user_info = req.body;
        console.log(req.body);
        //console.log(req);
        //res.send("creamos un alumno: " + user_info.nombre + " Edad: " + user_info.edad);
        return res.status(200).json( {
            status: 200,
            nombre_de_alumno: user_info.nombre + " " + user_info.apellido,
            edad: user_info.edad
        })

    },

    actualizar_alumno: function(req, res) {
        res.send("actualizamos un alumno");
    }, 
    
    eliminar_alumno: function(req, res) {
        res.send("borramos o eliminamos un alumno");
    }
    */
    
};

module.exports = controller;