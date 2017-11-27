var passport = require('../models/passport');
var User   = require('../models/usermodel');
var jwt    = require('jsonwebtoken');
var secret = 'urgonnadieclown865626';

module.exports = function (router) {
  router.get('/searchByName/:name', function(req, res, next){
    User.findOne({username: req.params.name}, function(err, user){
      if (err) {
        console.log(err);
      } else {
        res.send(user);
      }//else
    })//findCb
  }) // get event by token?
  router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));

  router.get('/facebook/callback',
    passport.authenticate('facebook', {session: false, failureRedirect: '/' }),
    function(req, res) {
      console.log(req.user);
      // Successful authentication, redirect home.
      res.redirect('/authorization?token=' + req.user.token + "&name=" + req.user.name);  });
  // http://localhost:8000/users/users
  //user registration route
  router.post('/users', function(req, res){
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.image = req.body.image;// this doesnt do anything. needs UPLOAD
    if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {
      res.json({ success: false, message: 'Ensure Username, Email and Password were provided' });
    } else {
        user.save(function(err, newUser){
          if (err) {
            res.json({ success: false, message: 'Username or Email already exist' });
          } else {
            res.json({ success: true, message: 'User created!' });
          }
        });
      }
  });
  //http://localhost:8000/users/authenticate
  //user login route
  router.post('/authenticate', function(req, res) {
    User.findOne({ email: req.body.email }).select('email username password _id').exec(function(err, user){
      if (err) throw err;
      if (!user) {
        res.json({ success: false, message: 'could not authenticate user' });
      } else if (user) {
        if (req.body.password) {
          var validPassword = user.comparePassword(req.body.password);
        } else {
          res.json({ success: false, message: 'No Password provided' });
        }
        if (!validPassword) {
          res.json({ success: false, message: 'could not authenticate password' });
        } else {
          var token = jwt.sign({ username: user.username, email: user.email, id: user._id }, secret, { expiresIn: '72h' } );
          res.json({ success: true, message: 'User authenticated', token: token });
        }
      }
    });
  });

  router.use(function (req, res, next) {
    var token = req.body.token || req.body.query || req.headers['x-access-token'];
    if (token) {
      // verify a token symmetric
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          res.json({ success: false, message: 'token invalid' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.json({ success: false, message: 'No token provided' });
    }
  });

  router.post('/currentUser', function(req, res) {
    res.send(req.decoded);
  });

  router.get('/:token', function(req, res, next){
    User.find({token: req.body.token}, function(err, token){
      if (err) {
        console.log(err);
      } else {
        res.send(token);
      }//else
    })//findCb
  }) // get event by token?

router.post('/login', passport.authenticate('local'), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.send(req.user);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.send('Logged Out');
});

  return router;
}//module.exports
