var passport = require('passport');
var mongoose = require('mongoose');
var Schema = require('../schema.js');
var Usuarios = mongoose.model('Usuarios', Schema);


module.exports = function() {
// used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      Usuarios.findById(id, function(err, user) {
          done(err, user);
      });
  });

};
