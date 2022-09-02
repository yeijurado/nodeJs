'use strict'

const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator");

// import the models 
var Usuarios = require('../models/usuarios');
var Sessions = require('../models/sessions');

var controller = {

    login: function(req, res) {

        // validate the data sent to the endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        };

        let login_info = req.body;
        //console.log(login_info);
        Usuarios.findOne({mail: login_info.mail, pass: login_info.pass}).exec( (err, usuario) => {
            if(err) return res.status(500).json({status: 500, mensaje: err});
            if(!usuario) return res.status(200).json({status: 200, mensaje: "los datos no son válidos"});

            // using jwt
            const payload = {
                // To know who is making the ops
                user_id: usuario.id
            };

            // to generate the token
            const access_token = jwt.sign(payload, 'qlm6pZ5c9JJRtncWDrss8EX7dbMYYHKW05s657ytnYhTu1BG4C', {
                expiresIn: '1d'
            });

            //console.log(access_token);

            // create a json object to get the info to update in the collection
            let update = {
                user_id: usuario.id,
                jwt: access_token
            };

            // search and update if found in collection
            // 1st param is the search, 2nd param is the json object
            // 3rd param if not find then insert
            Sessions.findOneAndUpdate({user_id: usuario.id}, update, {upsert: true, new: true}, (err, sessionsUpdate) => {
                if(err) return res.status(500).send({message: err});
                
                if(!sessionsUpdate) return res.status(404).send({message: "Datos erroneos."});

                return res.status(200).json({
                    status: 200,
                    message: "Autenticación Correcta.",
                    token: access_token
                });

            });


            
           


        });



    },

    // Method to logout
    logout: function(req, res) {
        //console.log(req.decoded);
        Sessions.findOneAndRemove({user_id: req.decoded.user_id}, (err, sessionDeleted) => {
            if(err) return res.status(500).send({message: err});
            if(!sessionDeleted) return res.status(404).send({message: "Datos erroneos."});

            return res.status(200).send({
                message: "El Usuario salió correctamente."
            });
        });
    }


};

module.exports = controller;