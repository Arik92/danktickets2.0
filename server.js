var express     = require('express');
var mongoose    = require('mongoose');
var eventRoutes = require('./routes/eventRoutes');
//var expressSession = require('express-session');
var bodyParser  = require('body-parser');
//var LocalStrategy = require('passport-local').Strategy;
var router      = express.Router();
var userRoutes  = require('./routes/userRoutes')(router);
var eventRoutes = require('./routes/eventRoutes');

mongoose.connect(process.env.CONNECTION_STRING||"mongodb://localhost/dankTickets");

var app         = express();
var port        = process.env.PORT || '8000';
var morgan      = require('morgan');
var passport    = require('passport');
var social      = require('./passport/passport')(app, passport);

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
  });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use('/events', eventRoutes);
app.use('/users', userRoutes);

app.all('[^.]+', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
  // res.send("GOD DAMN!!!!!!!!!!!!!");
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

app.listen(port, function() {
  console.log("Dank tickets, tick-it-up! Listening on " + port);
});
