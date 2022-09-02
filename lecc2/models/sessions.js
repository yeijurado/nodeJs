'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsessionsSchema = Schema({
    user_id: {type: String, require: true, unique: true},
    jwt: String
});

// sessions is the name of the collection
module.exports = mongoose.model('sessions', UsessionsSchema);