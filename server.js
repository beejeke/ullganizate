var express = require('express')
var app = express()
var path = require('path')
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');

//permite coger parámetros de la url(query string)
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/usuarios', function(error){
  if (error) {
    throw error;
  } else {
    console.log('Conectado a MongoDB');
  }
});

// This is our mongoose model for todos
var Schema = mongoose.Schema({
    usuario: String,
    contrasena: String
});

var Usuarios = mongoose.model('Usuarios', Schema);

var insert = function (user, pass) {

  console.log(user);
  console.log(pass);

  usuario1 = new Usuarios ({"usuario": user, "contrasena": bcrypt.hashSync(pass)}, function (err, result) {
    if (err) return handleError(err);
  })

  usuario1.save (function (err) {
    if (err) return handleError(err);
  })

};

app.get('/',function(req,res){

     res.sendFile(path.join(__dirname+'/client/index.html'));

});

app.post('/login', function(req, res){
    console.log(req.body.form_username)
    console.log(req.body.form_password)
         res.sendFile(path.join(__dirname+'/client/index.html'));
});

app.get('/login', function(req, res){
     res.sendFile(path.join(__dirname+'/client/index.html'));
});

app.post('/register', function(req, res){

      console.log(req.body.form_username)
      console.log(req.body.form_password)
  if(!req.body.form_username || !req.body.form_password)
  {
      console.log('registrar failed');
      res.sendFile(path.join(__dirname+'/client/index.html'));
  }
  else{
    Usuarios.findOne({usuario: req.body.form_username}, function (err, result) {
      if (err) {
        console.log(err);
        res.send("ERROR");
      } else {

        if (result != null) {

          console.log('Usuario ya registrado')
          console.log(req.body.form_username)
          res.sendFile(path.join(__dirname+'/client/index.html'));

        } else {

          insert(req.body.form_username, req.body.form_password);
          res.sendFile(path.join(__dirname+'/client/index.html'));

        }

      }
    })

  }
});

app.get('/register', function(req, res){
     res.sendFile(path.join(__dirname+'/client/index.html'));
});

app.use('/', express.static(path.join(__dirname, './')));

  var server = app.listen(process.env.PORT || 8087, ()=> {
	var host = server.address().address
	var port = server.address().port

	console.log('Conectado al puerto 8087')
})
