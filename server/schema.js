// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var Schema = mongoose.Schema({

    local             : {
        name          : String,
        password      : String,
    },
    social            : {
        name: String,
        someID: String
    }

});

// create the model for users and expose it to our app
module.exports =  Schema;
