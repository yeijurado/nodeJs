'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfesoresSchema = Schema({
    identificacion: {type: Number, require: true, unique: true},
    nombre: { type: String, require: true},
    edad: { type: Number, require: true},
    genero: { type: String, require: true},
    especialidad: { type: String, require: true}
});

// this export recieves two parameters: name of collection, name of schema
module.exports = mongoose.model('profesores', ProfesoresSchema);