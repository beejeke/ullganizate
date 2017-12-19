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

//permite coger parámetros de la url(query string)
app.use(bodyParser.urlencoded({
  extended: false
}));

mongoose.connect('mongodb://localhost:27018/usuarios', function(error) {
  if (error) {
    throw error;
  } else {
    console.log('Conectado a MongoDB');
  }
});

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({ secret: 'aguacate', resave: true, saveUninitialized: true}));
  app.use(passport.initialize());
  app.use(passport.session());

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  
  app.use('/', express.static('client'));


require('./server/routes.js')(routes, passport, path, dir);
app.use('/', routes);

app.use('/', express.static(path.join(__dirname, 'client')));

  var server = app.listen(process.env.PORT || 8087, ()=> {
	var host = server.address().address
	var port = server.address().port

	console.log('Conectado al puerto 8087')
})
