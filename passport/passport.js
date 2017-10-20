var FacebookStrategy = require('passport-facebook').Strategy;
var User             = require('../models/usermodel');
var session          = require('express-session');
var jwt              = require('jsonwebtoken');
var secret           = 'urgonnadieclown865626';

module.exports = function(app, passport) {

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false }}))

  passport.serializeUser(function(user, done) {
    token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '72h' } );
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
      User.findOne({ email: profile._json.email }).select('username password email').exec(function(err, user) {
        if (err) done(err);

        if (user && user != null) {
          done(null, user);
        } else {
          done(err);
        }
      })
      done(null, profile);
    }
  ));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res){
    res.redirect('/facebook/' + token);
  });

  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
  
  return passport;
};