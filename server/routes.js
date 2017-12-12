module.exports = function(router, passport, path, dir) {
let bd = require('./actions.js');
var passportGithub = require('./passport/auth/github.js');
var passportTwitter = require('./passport/auth/twitter.js');
var passportFacebook = require('./passport/auth/facebook.js');
  router.get('/',function(req,res){
       res.sendFile(path.join(dir, 'index.html'));

  });

  router.post('/login', function(req, res){
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

          res.sendFile(path.join(dir, 'index.html'));
        } else {

          res.sendFile(path.join(dir, 'index.html'));
        }
      }
  });

  router.get('/login', function(req, res){
       res.sendFile(path.join(dir, 'index.html'));
  });

  router.post('/register', function(req, res){

        console.log(req.body.form_username)
        console.log(req.body.form_password)
        console.log(req.body.form_email)
        console.log(req.body.form_rol)
    if(!req.body.form_username || !req.body.form_password || req.body.form_email || req.body.form_rol)
    {
        console.log('registrar failed');
        res.sendFile(path.join(dir, 'index.html'));
    }
    else{

        bd.insert(req.body.form_username, req.body.form_password, req.body.form_email, req.body.form_rol);
        res.sendFile(path.join(dir, 'index.html'));
      }
  });

  router.get('/register', function(req, res){
    console.log("entrando en registro")
       res.sendFile(path.join(dir, 'index.html'));
  });


  router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

  router.get('/auth/twitter/callback',
    passportTwitter.authenticate('twitter', {
      failureRedirect: '/login',
      successRedirect : '/'
     }),
    function(req, res) {
      // Successful authentication
      console.log("todo correcto con twitter")
    });


router.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback',
  passportGithub.authenticate('github', {
    failureRedirect: '/login',
    successRedirect : '/'
   }),
  function(req, res) {
    // Successful authentication
    console.log("todo correcto con github")
  });

  router.get('/auth/facebook',
    passportFacebook.authenticate('facebook'));

  router.get('/auth/facebook/callback',
    passportFacebook.authenticate('facebook', {
      failureRedirect: '/login',
      successRedirect : '/'
     }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });


  };
