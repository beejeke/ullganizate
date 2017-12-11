var express = require('express')
var app = express()
var routes = express.Router();
var path = require('path')
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter');
var dir = path.join(__dirname, 'client');

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({ secret: 'aguacate', resave: true, saveUninitialized: true}));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/', express.static('client'));
mongoose.connect('mongodb://localhost:27018/Usuarios', function(error){
  if (error) {
    throw error;
  } else {
    console.log('Conectado a MongoDB');
  }
});


require('./server/routes.js')(routes, passport, path, dir);
app.use('/', routes);

app.use('/', express.static(path.join(__dirname, 'client')));
  var server = app.listen(process.env.PORT || 8087, ()=> {
	var host = server.address().address
	var port = server.address().port

	console.log('Conectado al puerto 8087')
})






/* COSAS A QUITAR:




var auth = function(req, res, next) {
  console.log(req.session.user);
  Usuarios.findOne({usuario: req.session.user}, function (err, result) {
    if (err) {
      console.log(err);
      res.send("ERROR");
    } else {
      console.log(result);
      if (result != null && result.usuario != undefined) {
        if (req.session) {
          return next();
        } else {
          return res.sendStatus(401);
        }
      } else {
        return res.sendStatus(401);
      }
    }
  })
};





*/
