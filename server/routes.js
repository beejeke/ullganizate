module.exports = function(router, passport, path, dir) {
var bd = require('./actions.js');
var passportGithub = require('./passport/auth/github.js');
var passportTwitter = require('./passport/auth/twitter.js');
var passportFacebook = require('./passport/auth/facebook.js');



  var auth = function(req, res, next) {
    if(req.session.admin == true || req.session.user != undefined) return next();
    else return res.redirect('/');

  };



  router.get('/',function(req,res){
       res.sendFile(path.join(dir, 'index.html'));

  });

  router.post('/login', function(req, res){
    console.log(req.body.form_username.match(/.*%.*/))
    if(!req.body.form_username.match(/.*%.*/))
    {
      console.log("logging")
      console.log(req.body.form_username)
        if (!req.body.form_username || !req.body.form_password) { //campos invalidos o nulos

          console.log('Rellene los campos');
          res.sendFile(path.join(dir, 'index.html'));

        } else {
          bd.isInUser(req.body.form_username, req.body.form_password, req, res)
          if(req.session.admin != true)
          {
            res.sendFile(path.join(dir, 'index.html'));
          }
        }
      }
      else{

        res.sendFile(path.join(dir, 'index.html'));
      }
  });

router.get('/client',auth, function(req, res){
  console.log("Rol cliente: "+req.session.rol)
  console.log("Usuario autenticado: "+ req.session.user);
  bd.getEvent(req.session.user, req, res);
})

router.get('/profEnviados', function(req, res){
    bd.getEventEnviados(req.session.user, req, res);
})


router.post('/student/evento', auth, function(req, res){
  bd.addEvent(req.body.titulo_evento, req.session.user, req.session.user, req.body.fecha_inicio, req.body.fecha_fin, undefined, req.body.descripcion_evento)
  res.redirect('/client')
})

router.post('/profesor/evento', auth, function(req, res){
  bd.addEvent(req.body.titulo_evento, req.body.destino_evento, req.session.user, req.body.fecha_inicio, req.body.fecha_fin, undefined, req.body.descripcion_evento)
  res.redirect('/profEnviados')
})

router.get('/student/evento', auth, function(req, res){
  res.redirect('/client')
})

  router.get('/login', function(req, res){
       res.sendFile(path.join(dir, 'index.html'));
  });

  router.post('/register', function(req, res){

    if(!req.body.form_username.match(/.*%.*/))
    {
      console.log("Usuario: "+ req.body.form_username)
      console.log("Contraseña: "+ req.body.form_password)
      console.log("Email: "+ req.body.form_email)
      console.log("Rol: "+ req.body.form_rol)
      if(!req.body.form_username || !req.body.form_password || !req.body.form_email || !req.body.form_rol)
      {
          console.log('registrar failed');
          res.sendFile(path.join(dir, 'index.html'));
      }
      else {

          bd.insert(req.body.form_username, req.body.form_password, req.body.form_email, req.body.form_rol);
          res.sendFile(path.join(dir, 'index.html'));
      }
    }
    else{
      console.log("por poner algo")
    }

  res.sendFile(path.join(dir, 'index.html'));
  });

  router.get('/register', function(req, res){
    console.log("entrando en registro")
       res.sendFile(path.join(dir, 'index.html'));
  });

  router.get('/logout', function(req, res) {
      req.session.destroy();
      res.sendFile(path.join(dir, 'index.html'));
  })
  router.post('/eliminar', function(req, res){
    console.log("evento: "+req.body.idUser)
    bd.deleteEvent(req.body.idUser, res, req);
    res.redirect('/client')
  })

  router.post('/Edit', function(req, res){
    console.log(req.body)
    bd.EditEvent(req.body.titulo_evento, req.body.fecha_inicio, req.body.fecha_fin, Date(), req.body.descripcion_evento, req.body.idUser);
    res.redirect('/client')
  })



//----------------------Twitter--------------------//

  router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

  router.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
      console.log("todo correcto con twitter")
      req.session.rol = 1;
      req.session.user = req.user.social.name;
      req.session.admin = true;
          res.redirect('/client')
    });



//----------------------Github--------------------//

router.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/' }), function(req, res) {
    console.log("todo correcto con github")
    req.session.rol = 1;
    req.session.user = req.user.social.name;
    req.session.admin = true;
    res.redirect('/client')
  });


//----------------------FACEBOOK--------------------//


  router.get('/auth/facebook',
    passportFacebook.authenticate('facebook'));

  router.get('/auth/facebook/callback',
    passportFacebook.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
      req.session.rol = 1;
      req.session.user = req.user.social.name;
      req.session.admin = true;
      res.redirect('/client')
    });


  };  //--------------FIN--------------------------//
