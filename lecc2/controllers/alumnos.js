'use strict'

const { validationResult } = require('express-validator');

// import the model
var Alumnos = require('../models/alumnos'); 

// create a controller

var controller = {
    
    // create methods

    // Method to list everything from DB
    alumnos: function(req, res) {
        Alumnos.find({}).exec((err, alumnos) => {
            if(err) return res.status(500).json({status: 500,mensaje: err});
            if(!alumnos) return res.status(200).json({status: 200,mensaje: "No hay alumnos por listar" });
            //console.log(alumnos);

            return res.status(200).json({
                status: 200,
                data: alumnos
            });

        });
    }, 

    // Method to list one student by id from db
    alumno: function(req, res) {
        let n_lista = req.params.n_lista;
        //console.log(n_lista);

        Alumnos.findOne({n_cuenta: n_lista}).exec( (err, alumno) => {
            if(err) return res.status(500).json({status: 500, mensaje: err});
            if(!alumno) return res.status(200).json({status: 200, mensaje: "No se encontró el alumno"});

            return res.status(200).json({
                status: 200,
                data: alumno
            });
        });

    },
    
    // Method to create one student
    crear_alumno: function(req, res) {
        
        // Data validation sent to the endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }  
        
        let user_info = req.body;

        // Insert the info after validation

        // searching if the n_cuenta is already in Database
        Alumnos.findOne({n_cuenta: user_info.n_cuenta}).exec( (err, alumno) => {
            if(err) return res.status(500).json({status: 500, mensaje: err});
            if(alumno) return res.status(200).json({
                status: 200, 
                mensaje: "El número de cuenta ya existe."
            });

            // Intance the model to save only the correct data
            let alumnos_model = new Alumnos();
        
            alumnos_model.n_cuenta = user_info.n_cuenta;
            alumnos_model.nombre = user_info.nombre;
            alumnos_model.edad = user_info.edad;
            alumnos_model.genero = user_info.genero;

            alumnos_model.save((err, alumnoStored) => {
                if(err) return res.status(500).json({status: 500, mensaje:err});
                if(!alumnoStored) return res.status(200).json({
                    status: 200,
                    mensaje: "No se logró almacenar el alumno"
                });

                return res.status(200).json({
                    status: 200,
                    message: "Usuario almacenado con éxito" 
                });
            });

        });
        //console.log(user_info);
    },

    // Method to update a record
    update_alumno: function(req, res) {

        // Data validation sent to the endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }  
        
        // variable that contains the params that come from the URL
        let n_cuenta = req.params.n_cuenta;
        // variable that contains the json body
        let user_info = req.body;

        // json object that guarantee the info to be updated
        let alumno_info_update = {
            nombre: user_info.nombre,
            edad: user_info.edad,
            genero: user_info.genero
        };

        Alumnos.findOneAndUpdate({n_cuenta: n_cuenta}, alumno_info_update, {new: true},
            (err, alumnoUpdate) => {
                if(err) return res.status(500).json({message: 'Error al actualizar'});
                if(!alumnoUpdate) return res.status(404).json({message: 'No existe el alumno.'});
                
                return res.status(200).json({
                    nombre: alumnoUpdate.nombre,
                    edad: alumnoUpdate.edad,
                    genero: alumnoUpdate.genero
                });

            });

        console.log(user_info);

    },

    // Method to delete one record
    delete_alumno: function(req, res) {

        // variable that contains the params that come from the URL
        let n_cuenta = req.params.n_cuenta;

        Alumnos.findOneAndRemove({n_cuenta: n_cuenta}, (err, alumnoDelete) => {
            if(err) return res.status(500).json({message: 'Error al Eliminar el registro'});
            if(!alumnoDelete) return res.status(404).json({message: 'El usuario a eliminar no existe'});

            return res.status(200).json({
                message: 'Usuario eliminado con éxito'
            });
        });
    }

};

module.exports = controller;