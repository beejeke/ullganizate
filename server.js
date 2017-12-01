var express = require('express')
var app = express()
var path = require('path')
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var session = require('express-session');

//permite coger parámetros de la url(query string)
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27018/usuarios', function(error){
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

app.use(session({
    secret: 'aguacate',
    resave: true,
    saveUninitialized: true
}));

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

var eliminar = function (user) {

  console.log(user);
  Usuarios.findOne({usuario: user}, function (err, result) {
    if (err) {
      console.log(err);
      res.send("ERROR");
    } else {

      if (result != null) {
        console.log(result.username)
        if (result.username == user) {
          console.log("Se ha eliminado al usuario: "+ result.username)
          Usuarios.remove({usuario: user}, function (err, result) {
            if(err) console.log(err);
          });
        }

      } else {
        console.log('No se ha encontrado el elemento que desea borrar');
      }
    }
  })


};


app.use(express.static(__dirname + '/'));

app.get('/',function(req,res){

     res.sendFile(path.join(__dirname+'/client/index.html'));

});

app.post('/login', function(req, res){
  console.log("logging")
    if (!req.body.form_username || !req.body.form_password) { //campos invalidos o nulos

      console.log('Rellene los campos');
      res.sendFile(path.join(__dirname+'/client/index.html'));

    } else {
      Usuarios.findOne({usuario: req.body.form_username}, function (err, result) {
        if (err) {
          console.log(err);
          res.send("ERROR");
        } else {
          if (result != null) {
            if (result.username = req.body.form_username && bcrypt.compareSync(req.body.form_password, result.contrasena)) {
              console.log("logged")
              req.session.user = req.body.form_username;
              req.session.admin = true;
              console.log("Usuario correcto");
              console.log(result.usuario);
              res.sendFile(path.join(__dirname+'/client/index.html'));
            }

          } else {
            console.log('login failed');
            res.sendFile(path.join(__dirname+'/client/index.html'));
          }
        }
      })
    }
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
  console.log("entrando en registro")
     res.sendFile(path.join(__dirname+'/client/index.html'));
});

app.use('/', express.static(path.join(__dirname, './')));

  var server = app.listen(process.env.PORT || 8087, ()=> {
	var host = server.address().address
	var port = server.address().port

	console.log('Conectado al puerto 8087')
})
