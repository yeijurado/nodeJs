'use strict'

const jwt = require('jsonwebtoken');

let Sessions = require('../models/sessions');

const middlewares = {
    userProtectUrl: function(req, res, next){

        // getting the token from header
        const token = req.headers['access-token'];

        if(token) {

            jwt.verify(token, 'qlm6pZ5c9JJRtncWDrss8EX7dbMYYHKW05s657ytnYhTu1BG4C', (err, decoded) => {
                if(err) {
                    return res.status(403).json({message: "Token Invalida."});
                } else {
                    req.decoded = decoded;

                    // to validate the newest token in collection
                    Sessions.findOne({user_id: req.decoded.user_id, jwt: token}).exec((err, session) => {
                        if(err) return res.status(500).send({message: "Error al devolver los datos."});

                        if(!session) return res.status(404).send({message: "Los datos de autenticación no son válidos."});

                        next();
                    });

                    
                };

            });

        } else {
            res.status(403).send({
                message: "Token no valida."
            });

        };

    }
};

module.exports = middlewares;