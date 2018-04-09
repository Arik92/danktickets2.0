var express = require('express');
var router = express.Router();
var qrImage = require('qr-image');
var fs = require('fs');
var Ticket = require("../models/ticketmodel");
var User = require("../models/usermodel");
var Event = require("../models/eventmodel"); //do I want to populate an event? 
//var Profile = require("../models/") should I tie the ticket to an organizer or event, alongside the user
 var checkInURL;
 if (process.env.NODE_ENV === 'production') {
   checkInURL = "https://danktickets.herokuapp.com/checkIn/";
  } else {
   checkInURL = "http://localhost:8000/checkIn/";
  }

function toObjectId(string) {
	var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(string);
} // var organizerQuery = toObjectId(req.params.id); use case example

/* TODO:  
 4. delete ticket~. Not yet sure how and when
*/

//  1. get all of an associated event's tickets
router.get('/eventTickets/:id', function(req, res, next){
  var eventQuery = toObjectId(req.params.id);
  // populate owner field to get username and email
  Ticket.find({eventId: eventQuery}).populate({
	  path: 'owner',
	  select: 'username email'
	  }).exec(function(err, tickets){
    if (err) {
      console.error(err);
    } else {        
	  console.log("reached result route with", tickets);	
      res.send(tickets);
    }
  })//exec()
}) // get tickets by event id 

// 2. get all of a user's tickets
 router.get('/userTickets/:id', function(req, res, next){
  var userQuery = toObjectId(req.params.id);
  // might need to populate event
  Ticket.find({owner: userQuery}).populate({
	  path: 'eventId', 
	  select: 'title startDateDisplay location.venue_name location.'
	  }
  ).exec(function(err, tickets){
    if (err) {
      console.error(err);
    } else {         	 
	  console.log("reached result route with", tickets);
      res.send(tickets);
    }
  })//exec()
}) // get tickets by event id 

router.post('/', function (req, res1, next) {	
 var docs = [];
 var tempTick; 
 var currUrl;
 for (var i=0;i<req.body.length;i++) {
	 currUrl = checkInURL;
	 tempTick = new Ticket(req.body[i]);
	 tempTick.imgName = "./public/img/qr/"+tempTick._id+".png";
	 currURL = checkInURL+tempTick._id;
	 qrImage
     .image(currURL, {type:'png', size: 20})
	 .pipe(fs.createWriteStream(tempTick.imgName));		
	 console.log("pushing "+tempTick+" into docs");
	 docs.push(tempTick);
 }//for initializing docs	 
 //var e = new Event(req.body);
 //console.log("request body: ", req.body);
 Ticket.insertMany(docs, function(error, result){
 if (error) {
 console.log("reached error route");
 console.log(error);
  } else {
    console.log("added tickets? result is", result);
    // res.send(result);
    res1.send(result);
    }//else
  });
 
 /*e.save(function(error, result){
 if (error) {
 console.log("reached error route");
 console.log(error);
  } else {
    console.log("reached result route");
    // res.send(result);
    res1.send(result);
    }//else
  }); */
})//regular uploads(no pic provided)
router.put('/checkIn/:ticketId/:orgId', function(req, res) {	
	var ticketQuery = toObjectId(req.params.ticketId);
	Ticket.findOneAndUpdate({$and: [{_id: ticketQuery},{'merchantId': req.params.orgId}]},{$set: {'checkedIn': true}} ,function(err, ticket){
	if (err) {
      console.log(err);
      res.send(err);
	 }  else {   
      res.send(ticket);
		}
	});
})//tickets check in route for scanning tickets 
router.delete('/:id',function(req,res){
  //TODO: delete associated image. make sure the image address is passed
  Event.findOneAndRemove({ _id: req.params.id }, function(err, event) {
    if (err) {
      console.log(err);
      res.send(err);
	 }  else {   
      res.send(event);
		}
	});
});
module.exports = router;

