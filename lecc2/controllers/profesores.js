'use strict'

const { validationResult } = require('express-validator');

// import the model
let Profesores = require('../models/profesores'); 

// create a controller

var controller = {
    
    // Method to list all teachers from DB
    profesores: function(req, res) {
        Profesores.find({}).exec((err, profesores) => {
            if(err) return res.status(500).json({status: 500,mensaje: err});
            if(!profesores) return res.status(200).json({status: 200,mensaje: "No hay profesores por listar" });
            //console.log(profesores);

            return res.status(200).json({
                status: 200,
                data: profesores
            });

        });
    },

    // Method to list one Teacher by id from db
    profesor: function(req, res) {
        let n_lista = req.params.n_lista;
        //console.log(n_lista);

        Profesores.findOne({identificacion: n_lista}).exec( (err, profesor) => {
            if(err) return res.status(500).json({status: 500, mensaje: err});
            if(!profesor) return res.status(200).json({status: 200, mensaje: "No se encontró el profesor en la base de datos"});

            return res.status(200).json({
                status: 200,
                data: profesor
            });
        });

    },

    // Method to create one teacher
    crear_profesor: function(req, res) {
        // Data validation sent to the endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }  
        
        let user_info = req.body;

        // Insert the info after validation

        // searching if the teacher is already in Database
        Profesores.findOne({identificacion: user_info.identificacion}).exec( (err, profesor) => {
            if(err) return res.status(500).json({status: 500, mensaje: err});
            if(profesor) return res.status(200).json({
                status: 200, 
                mensaje: "El profesor ya existe dentro de la base de datos."
            });

            // Intance the model to save only the correct data
            let profesores_model = new Profesores();
        
            profesores_model.identificacion = user_info.identificacion;
            profesores_model.nombre = user_info.nombre;
            profesores_model.edad = user_info.edad;
            profesores_model.genero = user_info.genero;
            profesores_model.especialidad = user_info.especialidad;

            profesores_model.save((err, profesorStored) => {
                if(err) return res.status(500).json({status: 500, mensaje:err});
                if(!profesorStored) return res.status(200).json({
                    status: 200,
                    mensaje: "No se logró almacenar el profesor en la base de datos"
                });

                return res.status(200).json({
                    status: 200,
                    message: "Profesor almacenado con éxito en la base de datos" 
                });
            });

        });
    },

    // Method to update a record
    update_profesor: function(req, res) {
        // Data validation sent to the endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }  
        
        // variable that contains the params that come from the URL
        let identificacion = req.params.identificacion;
        // variable that contains the json body
        let user_info = req.body;

        // json object that guarantee the info to be updated
        let profesor_info_update = {
            nombre: user_info.nombre,
            edad: user_info.edad,
            genero: user_info.genero,
            especialidad: user_info.especialidad
        };

        Profesores.findOneAndUpdate({identificacion: identificacion}, profesor_info_update, {new: true},
            (err, profesorUpdate) => {
                if(err) return res.status(500).json({message: 'Error al actualizar'});
                if(!profesorUpdate) return res.status(404).json({message: 'No existe el profesor en la Base de datos.'});
                
                return res.status(200).json({
                    nombre: profesorUpdate.nombre,
                    edad: profesorUpdate.edad,
                    genero: profesorUpdate.genero,
                    especialidad: profesorUpdate.especialidad
                });

            });
    },

    // Method to delete one record
    delete_profesor: function(req, res) {
        // variable that contains the params that come from the URL
        let identificacion = req.params.identificacion;

        Profesores.findOneAndRemove({identificacion: identificacion}, (err, profesorDelete) => {
            if(err) return res.status(500).json({message: 'Error al Eliminar el registro'});
            if(!profesorDelete) return res.status(404).json({message: 'El profesor a eliminar no existe en la base de datos'});

            return res.status(200).json({
                message: 'Profesor eliminado con éxito'
            });
        });
    }


};

module.exports = controller;