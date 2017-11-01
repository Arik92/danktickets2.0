var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');

passport.use(new FacebookStrategy({
      clientID: '793514707495227',
      clientSecret: '12d8dcfc4b9a3c728c0b38795a0b500b',
      callbackURL: "http://localhost:8000/users/facebook/callback",
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
      //code to check database goes here

   //code to create JWT goes here

   return done(null, profile);
    }))
module.exports = passport;
