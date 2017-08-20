var express = require('express');
//var expressSession = require('express-session');
var bodyParser = require('body-parser');
//var passport = require('passport');
// var localStrategy = require('passport-local').strategy;
// var mongoose = require('mongoose');
// var beerRoutes = require('./routes/beerRoutes');
// var userRoutes = require('./routes/userRoutes');
// var User = require('./models/userModel');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.static('node_modules'));


app.all('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

//main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});


app.listen(8000, function() {
  console.log("Fullstack project. Listening on 8000.");
});
