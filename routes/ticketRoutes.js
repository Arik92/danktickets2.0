var express = require('express');
var router = express.Router();
var Ticket = require("../models/ticketmodel");
var User = require("../models/usermodel");
var Event = require("../models/eventmodel"); //do I want to populate an event? 
//var Profile = require("../models/") should I tie the ticket to an organizer or event, alongside the user

function toObjectId(string) {
	var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(string);
} // var organizerQuery = toObjectId(req.params.id); use case example

/* TODO:  So which functionalities do I want? 
 4. delete ticket~. Not yet sure how and when
*/

//  1. get all of an associated event's tickets
router.get('/eventTickets/:id', function(req, res, next){
  var eventQuery = toObjectId(req.params.id);
  // populate owner field to get username and email
  Ticket.find({eventId: eventQuery}).populate('owner').exec(function(err, tickets){
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
  Ticket.find({owner: userQuery}).populate('eventId').exec(function(err, tickets){
    if (err) {
      console.error(err);
    } else {         	 
	  console.log("reached result route with", tickets);
      res.send(tickets);
    }
  })//exec()
}) // get tickets by event id 

router.post('/', function (req, res1, next) {
 // INPUT: I assume at this point that req.body is an array of tickets already defined with all needed objectID's
 var docs = [];
 var tempTick;
 for (var i=0;i<req.body.length;i++) {
	 tempTick = new Ticket(req.body[i]);
	 console.log("pushing "+tempTick+" into docs");
	 docs.push(tempTick);
 }//for initializing docs	 
 //var e = new Event(req.body);
 console.log("request body: ", req.body);
 Ticket.insertMany(req.body, function(error, result){
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

