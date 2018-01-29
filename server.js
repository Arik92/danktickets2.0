// to hide env variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
var express     = require('express');
//var cors = require('cors');
var app         = express();
var server      = require('http').createServer(app);
var io          = require('socket.io')(server);
var port        = process.env.PORT || '8000';
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var router      = express.Router();
var userRoutes  = require('./routes/userRoutes')(router); // why the router call?
var eventRoutes = require('./routes/eventRoutes');
var organizerRoutes = require('./routes/organizerRoutes');
var passport    = require('./models/passport');
var FacebookStrategy = require('passport-facebook').Strategy;
//var path        = require('path');
//var social      = require('./passport/passport')(app, passport);
//var expressSession = require('express-session');
//var LocalStrategy = require('passport-local').Strategy;



mongoose.connect(process.env.CONNECTION_STRING||"mongodb://localhost/dankTickets");
app.use(passport.initialize());
//app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.static('node_modules'));
// app.use(express.static('bower_components'));
app.use(express.static('ui-bootstrap-custom-build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cors());
//app.options('*', cors());

app.use('/events', eventRoutes);
app.use('/users', userRoutes);
app.use('/organizers', organizerRoutes);

//mongoose.connect(process.env.CONNECTION_STRING||"mongodb://localhost/dankTickets");

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:8000, https://localhost:8000, https://danktickets.herokuapp.com");
		//res.header("Access-Control-Allow-Credentials", "true");
		res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT"); 
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
  });




app.all('[^.]+', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
  // res.send("GOD DAMN!!!!!!!!!!!!!");
});

/*io.on('connection', function(socket) { // I am going to receive an array of tickets that are being bought.
	// there would be a validation function on the CLIENT to make sure the purchase is currently possible
	// TODO: take tickets from event
	// possibility : from 10 mins from connect they have the option of buying the itckts - otherwise disconnect them // change the tickets back
	console.log('socketedD');
	socket.emit('')
	//setTimeout(function(){ alert("your order has expired. please repeat the process"); }, 6000);
	// on disconnet: set them back
	socket.once('disconnect', function() {
		socket.emit('endSave');
      console.log('Got disconnect!');     
   });
	// on complete: 
	});*/
//main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // res.send({
  //   message: err.message,
  //   error: err
  // });
});

server.listen(port, function() {
  console.log("Dank tickets, tick-it-up! Listening on " + port);
});
