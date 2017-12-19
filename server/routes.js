module.exports = function(router, passport, path, dir) {
var bd = require('./actions.js');
var passportGithub = require('./passport/auth/github.js');
var passportTwitter = require('./passport/auth/twitter.js');
var passportFacebook = require('./passport/auth/facebook.js');



  var auth = function(req, res, next) {
    console.log("tratando de autenticar"+req.session.admin)
    if(req.session.admin == true || req.session.user != undefined) return next();
    else return res.sendStatus(401);

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
          bd.isInUser(req.body.form_username, req.body.form_password, req)
          if(req.session.admin = true)
          {

            console.log('Logged as: '+ req.body.form_username)

            res.redirect('/client');
          } else {

            res.sendFile(path.join(dir, 'index.html'));
          }
        }
      }
      else{

        res.sendFile(path.join(dir, 'index.html'));
      }
  });

router.get('/client',auth, function(req, res){
  console.log("usuario autenticado: "+ req.session.user);
  bd.getEvent(req.session.user, req, res);

})

router.post('/student/evento', auth, function(req, res){
  bd.addEvent(req.body.titulo_evento, req.session.user, req.session.user, req.body.fecha_inicio, req.body.fecha_fin, undefined, req.body.descripcion_evento)
})

router.get('/student/evento', auth, function(req, res){
  res.render('student', { user: req.session.user})
})
  router.get('/login', function(req, res){
       res.sendFile(path.join(dir, 'index.html'));
  });

  router.post('/register', function(req, res){

    if(!req.body.form_username.match(/*%*/))
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


//----------------------Twitter--------------------//

  router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

  router.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
      console.log("todo correcto con twitter")
      req.session.user = req.user.social.name;
      req.session.admin = true;
          res.redirect('/client')
    });



//----------------------Github--------------------//

router.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/' }), function(req, res) {
    console.log("todo correcto con github")
          console.log(req.user)
    req.session.user = req.user.social.name;
    req.session.admin = true;
    res.redirect('/client')
  });


//----------------------FACEBOOK--------------------//


  router.get('/auth/facebook',
    passportFacebook.authenticate('facebook'));

  router.get('/auth/facebook/callback',
    passportFacebook.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {

      req.session.user = req.user.social.name;
      req.session.admin = true;
      res.redirect('/client')
    });


  };  //--------------FIN--------------------------//
