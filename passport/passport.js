var FacebookStrategy = require('passport-facebook').Strategy;
var User             = require('../models/usermodel'); // Import User Model
var session          = require('express-session'); // Import Express Session Package

module.exports = function(app, passport) {
  
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false } }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new FacebookStrategy({
      clientID: '793514707495227',
      clientSecret: '12d8dcfc4b9a3c728c0b38795a0b500b',
      callbackURL: "http://localhost:8000/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile._json.email);
      // User.findOrCreate(..., function(err, user) {
      //   if (err) { return done(err); }
      //   done(null, user);
      // });
      done(null, profile);
    }
  ));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/signin' }));

  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
  
  return passport;
}

// var FacebookStrategy = require('passport-facebook').Strategy; // Import Passport-Facebook Package
// var User             = require('../models/usermodel'); // Import User Model
// var session          = require('express-session'); // Import Express Session Package
// var jwt              = require('jsonwebtoken'); // Import JWT Package
// var secret           = 'urgonnadieclown865626'; // Create custom secret to use with JWT

// module.exports = function(app, passport) {
//   // Start Passport Configuration Settings
//   app.use(passport.initialize());
//   app.use(passport.session());
//   app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false } }));
//   // End Passport Configuration Settings

//   // Serialize users once logged in 
//   // place to create token for user
//   passport.serializeUser(function(user, done) {
//     console.log(user.email)
//     // Check if the user has an active account
//     if (user.active) {
//         // Check if user's social media account has an error
//         if (user.error) {
//             token = 'unconfirmed/error'; // Set url to different error page
//         } else {
//             token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '72h' }); // If account active, give user token
//         }
//     } else {
//         token = 'inactive/error'; // If account not active, provide invalid token for use in redirecting later
//     }
//     done(null, user.id); // Return user object
//   });

//   // Deserialize Users once logged out 
//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user); // Complete deserializeUser and return done
//     });
//   });

//   // Facebook Strategy
//   passport.use(new FacebookStrategy({
//       clientID: '793514707495227',
//       clientSecret: '12d8dcfc4b9a3c728c0b38795a0b500b',
//       callbackURL: "http://localhost:8000/auth/facebook/callback",
//       profileFields: ['id', 'displayName', 'photos', 'email']
//     },
//     function(accessToken, refreshToken, profile, done) {
//       console.log(profile);
//       console.log(profile._json.email);
//       User.findOne({ email: profile._json.email }).select('username active password email').exec(function(err, user) {
//         if (err) done(err);

//         if (user && user != null) {
//           done(null, user);
//         } else {
//           done(err);
//         }
//       });
//     }
//   ));

//   // Facebook Routes
//   app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/facebookerror' }), function(req, res) {
//       res.redirect('/facebook/' + token); // Redirect user with newly assigned token
//   });
//   app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

//   return passport; // Return Passport Object
// };