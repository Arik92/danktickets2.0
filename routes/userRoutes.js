var passport = require('../models/passport');
var User = require('../models/usermodel');
var jwt = require('jsonwebtoken');
var secret = 'urgonnadieclown865626';

const nodemailer = require('nodemailer');
var mongoose = require('mongoose');


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
          sendNodeMailer(newUser);
        }
      });
    }
  });

  //// ===================== nodeMailer code ===========================

  function sendNodeMailer(newUser) {
    console.log('nodeMailer triggered', newUser);
    const output = `
    <h2>Thank you for registering ${newUser.username} </h2>
    <p>Please click the following link to complete the registration process</p>
    <br>
    <a href="http://localhost:8000/validate/${newUser._id.toString()}" target="_blank">
      CLICK ME!
    </a>
  `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email', // from nodemailer
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'o5vhss7vo6fy7wiv@ethereal.email', // generated ethereal user
        pass: 'fWWUDGftCf1U3wNxPv'  // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Nodemailer Test Sender" <fucku@fucku.com>', // sender address
      to: 'katzy687@gmail.com', // list of receivers
      subject: 'dank apps nodemailer test', // Subject line
      text: 'Hello dumbass', // plain text body
      html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      console.log('sendMail triggered')
      if (error) {
        console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // res.render('contact', { msg: 'Email has been sent' });
      // res.status(200).send('email sent');
    });
  }

  //// ===================== resume with routes code ===========================

  //http://localhost:8000/users/validate/:userId
  // validate new user from nodemailer link
  router.post('/emailValidate', function (req, res) {
    // var id = new mongoose.Types.ObjectId(req.body.userId);
    // console.log(typeof(id));
    console.log('req.body', req.body);
    User.find( (err, users) => {
      if (err) throw err;

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

      User.findByIdAndUpdate(matchingUser._id, matchingUser, { new: true }, (error, user) => {
        if (err) throw err;
        const token = jwt.sign({ username: user.username, email: user.email, id: user._id, isEmailValidated: user.isEmailValidated }, secret, { expiresIn: '72h' });
        res.json({ success: true, message: 'User validated, saved and token created', token: token, user: user });
      })
    });
  });

  //http://localhost:8000/users/authenticate
  //user login route
  router.post('/authenticate', function (req, res) {
    User.findOne( { $or: [{ email: req.body.email }, { _id: req.body.userId }] }).select('email username password _id isEmailValidated').exec(function (err, user) {
      if (err) throw err;

      let validPassword;
      if (!user) {
        res.json({ success: false, message: 'could not authenticate user' });
        return;
      }
      if (user && req.body.password) {
        validPassword = user.comparePassword(req.body.password);
        console.log('user', user);
        console.log('req.body', req.body);
        console.log(validPassword);
      }
      if (!validPassword) {
        res.json({ success: false, message: 'could not authenticate password' });
        return;
      }

      // this is the key!!!
      if (!user.isEmailValidated) {
        const token = jwt.sign({ username: user.username, email: user.email, id: user._id, isEmailValidated: user.isEmailValidated }, secret, { expiresIn: '72h' });
        res.json({ success: true, message: 'User authenticated', token: token });
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
