var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    session = require('express-session'),
    methodOverride = require('method-override'); //used to manipulate POST




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.get('/logout', function (req, res) {
  session.user = null;
});



router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var sifra = req.body.sifra;

  mongoose.model('user').findOne({email:email, sifra:sifra}, function (err, user){
    if(err) return next(err);
    if(!user) return res.send('Not logged in!');

    session.user = user;
    return res.send('Logged In!');
  })

});


router.post('/register', function(req, res, next)
{
  var email = req.body.email;
  var sifra = req.body.sifra;
  var ime = req.body.ime;

  var user = {
    email : email,
    sifra: sifra,
    ime: ime
  };

  mongoose.model('user').create(user, function (err, user){
    if(err) return next(err);

    console.log("User added: " + user);
    session.user = user;
    return res.send('Logged In!');
  })

});






module.exports = router;