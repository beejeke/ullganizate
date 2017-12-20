var mongoose = require('mongoose');
var Schema = require('./schema.js')
var bcrypt = require('bcrypt-nodejs');
var Usuarios = mongoose.model('Usuarios', Schema);
var Mes = require('./mes.js')

var bd = [];
bd.insert = function(user, pass, email, rol) {

  Usuarios.findOne({'local.name': user}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      if (result != null) {
          console.log("El usuario "+ user + " ya existente.");
        }
       else {
          console.log("Inserting user: "+user);
          console.log("With pass: "+pass);
          console.log("Email: "+ email);
          console.log("Rol: "+ rol)
          usuario1 = new Usuarios({'local.name': user, 'local.password': bcrypt.hashSync(pass), 'local.email': email, 'local.rol': rol}, function (err, result) {
            if (err) return handleError(err);
          })

          usuario1.save (function (err) {
            if (err) console.log(err);;
          })
        }
      }
    })
};

//esto esta mal
bd.delete = function(user) {

  Usuarios.findOne({'local.name' : user}, function (err, result) {
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

bd.isInUser = function(user, pass, req) {
  Usuarios.findOne({'local.name': user}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      if (result != null) {
        if (result.local.username = user && bcrypt.compareSync(pass, result.local.password)) {
          console.log("Usuario Correcto.");

          req.session.user = req.body.form_username;
          req.session.admin = true;
          console.log("correcto");
        }
      } else {
          req.session.admin = false;
        console.log('Usuario inexistente.');

        //res.sendFile('/client/index.html');
      }
    }
  })
};

bd.addEvent = function(titulo, nombreDestino, nombreEmisor, fi, ff, fm, contenido) {
var id = nombreDestino + new Date().toLocaleString();
console.log(id);

    timeline = new Usuarios({'timeline.id': id, 'timeline.titulo': titulo, 'timeline.nombreDestino': nombreDestino, 'timeline.nombreEmisor': nombreEmisor, 'timeline.fi': fi, 'timeline.ff': ff, 'timeline.fm': fm, 'timeline.contenido': contenido}, function (err, result) {
    if (err)
    {
      return handleError(err);
    }
  })
  timeline.save (function (err) {
    if (err) console.log(err);;
  })
}

bd.getEvent = function(nombreDestino, req, res){
  Usuarios.find( {'timeline.nombreDestino': nombreDestino }).sort({'timeline.ff': 1}).exec(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      if (result != null) {
        res.render('student', { user: req.session.user, evento: result , Mes: Mes})
        }
       else {
          console.log("No hay eventos.")
        }
      }
    })
//return eventos;
}
bd.deleteEvent = function(id, res, req){
  Usuarios.findOneAndRemove({'timeline.id':id}, function (err, resultado) {
    if (err) {
      console.log(err);
      res.send("ERROR");
    } else {
      if (resultado) {
          console.log("Se ha eliminado un evento de : "+ req.session.user)
        }
       else {
        console.log('No se ha encontrado el elemento que desea borrar');
        }
      }
  })
}

bd.EditEvent = function(titulo, fi, ff, fm, contenido, id){
  Usuarios.findOne({'timeline.id':id}, function (err, result) {
    if (err) {
      console.log(err);
      res.send("ERROR");
    } else {

      if (result != null) {
          result.timeline.titulo = titulo;
          result.timeline.fi = fi;
          result.timeline.ff = ff;
          result.timeline.contenido = contenido;
          result.save();

      } else {
        console.log('No se ha encontrado el elemento que desea borrar');
      }
    }
  })
}
module.exports = bd;
