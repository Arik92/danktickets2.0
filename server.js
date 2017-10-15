var express     = require('express');
var mongoose    = require('mongoose');
var eventRoutes = require('./routes/eventRoutes');
// mongoose.connect("mongodb://localhost/events");
//var expressSession = require('express-session');
var bodyParser  = require('body-parser');
var multer      = require('multer');
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var userRoutes = require('./routes/userRoutes')(router);
var eventRoutes = require('./routes/eventRoutes');

mongoose.connect(process.env.CONNECTION_STRING||"mongodb://localhost/dankTickets");
//mongoose.connect(process.env.CONNECTION_STRING||"mongodb://localhost/users");
var app         = express();
var port        = process.env.PORT || '8000';
var morgan      = require('morgan');

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static('public'));
    app.use(express.static('node_modules'));
    app.use(express.static('uploads'));//for pics

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
});
var upload = multer({ storage: storage }).single('file');
//var passport = require('passport');
// var localStrategy = require('passport-local').strategy;

// var userRoutes = require('./routes/userRoutes');
// var User = require('./models/userModel');
/////////////////////////////////   multer
app.post('/upload', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            console.log("file name:", req.file.filename);
             res.json({error_code:0,err_desc:null, file_name: req.file.filename});
        })
    });
/////////////////////////////////   multer

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
