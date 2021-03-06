var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');
var User   = require('./usermodel');
var jwt    = require('jsonwebtoken');
var callbackURL;
if (process.env.NODE_ENV === 'production') {
   callbackURL = "https://danktickets.herokuapp.com/users/facebook/callback";
  } else {
   callbackURL = "http://localhost:8000/users/facebook/callback";
  }
//localhost:8000/users/facebook/callback
// https://danktickets.herokuapp.com/users/facebook/callback
passport.use(new FacebookStrategy({
      clientID: '793514707495227',
      clientSecret: '12d8dcfc4b9a3c728c0b38795a0b500b',
	//callbackURL: "http://localhost:8000/users/facebook/callback",
      callbackURL: callbackURL,
      profileFields: ['id', 'displayName', 'picture', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
      //code to check database goes here
	  console.log("profile data", profile);
      User.findOne({'socialId': profile.id}, function(err, user){
        if (err) {
          console.error(err);
        } if (!user) {
          user = new User({
			version: 1,
            socialId: profile.id,
            email: profile.emails ? profile.emails[0].value : "",
            provider: 'facebook',
            username: profile.displayName,
            isEmailValidated: true,
			picture: profile.photos[0].value
          });
        } else {
          console.log("this user already exists in mongo!");
        }// else user exists in db. Still fetches it
        user.save(function(err, newUser) {
          if (err) {
            console.error(err);
          } else {
            var token = jwt.sign({
            id: newUser.id,
            name: newUser.username,
          }, 'thisIsTopSecret', { expiresIn: "7d" });
          return done(null, { token: token, name: newUser.username, id: newUser.id});
          }//else
        })//save CB
      })//findOne CB
    }))
module.exports = passport;
