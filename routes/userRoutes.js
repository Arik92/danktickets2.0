// to hide env variables
// require('dotenv').config();

var passport = require('../models/passport');
var User = require('../models/usermodel');
var jwt = require('jsonwebtoken');
var secret = process.env.JWT_SECRET;

var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const sendNodeMail = require('./nodeMailing');


module.exports = function (router) {

  router.get('/searchByName/:name', function (req, res, next) {
    User.findOne({ username: req.params.name }, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.send(user);
      }//else
    })//findCb
  }) // get event by token?
  router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));

  router.get('/facebook/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: '/' }),
    function (req, res) {
      console.log(req.user);
      // Successful authentication, redirect home.
      res.redirect('/authorization?token=' + req.user.token + "&name=" + req.user.name);
    });

  // http://localhost:8000/users/users
  //user registration route
  router.post('/users', function (req, res) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.image = req.body.image;// this doesnt do anything. needs UPLOAD
    user.isEmailValidated = false;
    if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {
      res.json({ success: false, message: 'Ensure Username, Email and Password were provided' });
    } else {
      user.save(function (err, newUser) {
        if (err) {
          res.json({ success: false, message: 'Username or Email already exist' });
        } else {
          res.json({ success: true, message: 'User created!' });
          // send email via nodeEmailer for verification
          sendNodeMail(newUser, 'register');
        }
      });
    }
  });

  //http://localhost:8000/users/forgotPassword
  // validate new user from nodemailer link
  router.post('/forgotPassword', function (req, res) {
    // this is a mongodb find
    User.find((err, users) => {
      if (err) throw err;

      // this is a native javascript find
      const matchingUser = users.find((user) => {
        return user.email === req.body.email;
      })

      if (!matchingUser) {
        console.log('no userr');
        res.json({ success: false, message: 'no userrr' });
        return;
      };

      sendNodeMail(matchingUser, 'pw-reset');
    });
  });

  //http://localhost:8000/users/forgotPassword
  router.post('/updatePassword', function (req, res) {
    // this is a mongodb find
    User.find((err, users) => {
      if (err) throw err;

      // this is a native javascript find
      const matchingUser = users.find((user) => {
        return user._id.valueOf().toString() === req.body.userId;
      })

      if (!matchingUser) {
        console.log('no userr');
        res.json({ success: false, message: 'no userrr' });
        return;
      };

      // update password
      const hashedNewPassword = bcrypt.hashSync(req.body.password);

      matchingUser.password = hashedNewPassword;

      User.findByIdAndUpdate(matchingUser._id, matchingUser, { new: true }, (error, updatedUser) => {
        if (err) throw err;
        res.json({ success: true, message: 'User password updated and saved to db', user: updatedUser });
      })

    });
  });

  //http://localhost:8000/users/emailValidate
  // validate new user from nodemailer link
  router.post('/emailValidate', function (req, res) {
    // this is a mongodb find
    User.find((err, users) => {
      if (err) throw err;

      // this is a native javascript find
      const matchingUser = users.find((user) => {
        return user._id.valueOf().toString() === req.body.userId;
      })

      if (!matchingUser) {
        console.log('no userr');
        res.json({ success: false, message: 'no userrr' });
        return;
      };

      // set email validation to true
      matchingUser.isEmailValidated = true;
      console.log('matchingUser', matchingUser);

      User.findByIdAndUpdate(matchingUser._id, matchingUser, { new: true }, (error, newUser) => {
        if (err) throw err;
        res.json({ success: true, message: 'User validated and saved to db', user: newUser });
      })
    });
  });

  //http://localhost:8000/users/authenticate
  //user login route
  router.post('/authenticate', function (req, res) {
    //console.log('authenticate req.body', req.body);

    // if resetting password, will look for the password
    const hashedNewPassword = bcrypt.hashSync(req.body.password);
    console.log(req.body.password);
    console.log('hashednewpw', hashedNewPassword);
    User.findOne({ $or: [{ email: req.body.email }, { password: hashedNewPassword }] }).select('email username password _id isEmailValidated').exec(function (err, user) {
      if (err) throw err;

      console.log('authenticated user', user);
      let validPassword;
      if (!user) {
        res.json({ success: false, message: 'could not authenticate user' });
        return;
      }
      if (user && req.body.password) {
        validPassword = user.comparePassword(req.body.password) ||
          (user.password.localeCompare(req.body.password) === 0);
        console.log('validPassword', validPassword);
      }
      if (!validPassword) {
        res.json({ success: false, message: 'could not authenticate password' });
        return;
      }

	  /*var token = jwt.sign({
            id: newUser.id,
            name: newUser.username,
          }, 'thisIsTopSecret', { expiresIn: "7d" }); how I did it onn passport.js */
      // this is the key!!!
      if (user.isEmailValidated) {
        const token = jwt.sign({ username: user.username, email: user.email, id: user.id }, secret, { expiresIn: '72h' });
        res.json({ success: true, message: 'User authenticated', token: token, username: user.username });
      } else {
        res.json({ success: false, message: 'email is not validated!!!' });

      }
    });
  });

  router.use(function (req, res, next) {
    var token = req.body.token || req.body.query || req.headers['x-access-token'];
    if (token) {
      // verify a token symmetric
      jwt.verify(token, secret, function (err, decoded) {
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

  router.post('/currentUser', function (req, res) {
    res.send(req.decoded);
  });

  router.get('/:token', function (req, res, next) {
    User.find({ token: req.body.token }, function (err, token) {
      if (err) {
        console.log(err);
      } else {
        res.send(token);
      }//else
    })//findCb
  }) // get event by token?

  router.post('/login', passport.authenticate('local'), function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send(req.user);
  });

  router.get('/logout', function (req, res) {
    req.logout();
    res.send('Logged Out');
  });

  return router;
}//module.exports
