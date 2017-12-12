var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var mongoose = require('mongoose');
var Schema = require('../../schema.js');
var User = mongoose.model('Usuarios', Schema);
var config = require('../_config');
var init = require('../init');


passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {

    var searchQuery = {
      'social.name': profile.displayName
    };

    var updates = {
      'social.name': profile.displayName,
      'social.someID': profile.id
    };

    var options = {
      upsert: true
    };

    // update the user if s/he exists or add a new user
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }

));

// serialize user into the session
init();


module.exports = passport;
