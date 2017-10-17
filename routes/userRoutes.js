var User   = require('../models/usermodel');
var jwt    = require('jsonwebtoken');
var secret = 'urgonnadieclown865626';

module.exports = function (router) {
  // http://localhost:8000/users/users
  //user registration route
  router.post('/users', function(req, res){
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.tickets = req.body.tickets;
    user.image = req.body.image;
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
    User.findOne({ username: req.body.username }).select('email username password').exec(function(err, user){
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
          var token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '72h' } );
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


  return router;
}


