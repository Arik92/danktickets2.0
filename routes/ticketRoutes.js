var express = require('express');
var router = express.Router();
var qrImage = require('qr-image');
var fs = require('fs');
var Ticket = require("../models/ticketmodel");
var User = require("../models/usermodel");
var Event = require("../models/eventmodel"); //do I want to populate an event? 
var EventTicket = require("../models/eventticketmodel");

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
router.get('/singleTicket/:id', function(req, res, next){
	console.log("id param is ",req.params.id)
  var ticketQuery = toObjectId(req.params.id);  
  Ticket.findOne({_id: ticketQuery},'checkedIn',function(err, foundTicket){
    if (err) { //////////////// Is this even used? 
      console.error(err);
    } else {        
	  console.log("reached result route with", foundTicket);	
      res.send(foundTicket);
    }
  })//exec()
}) // get tickets by event id 
router.get('/eventTickets/:id', function(req, res, next){
  var ticketQuery = toObjectId(req.params.id);
  console.log("getting there");
  // populate owner field to get username and email
  Ticket.find({eventId: ticketQuery}).populate({
	  path: 'owner',
	  select: 'username email'
	  }).exec(function(err, tickets){
    if (err) {
      throw (err);
    } else {        
	  console.log("reached result route with", tickets);	
      res.send(tickets);
    }
  })//exec()
}) // get tickets by event id 


 router.get('/userTickets/:id', function(req, res, next){
  var userQuery = toObjectId(req.params.id);
  // might need to populate event
  Ticket.find({owner: userQuery}).populate({
	  path: 'eventId', 
	  select: 'title startDateDisplay location.venue_name location.locationMapUrl'
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
	 tempTick.imgName = "/img/qr/"+tempTick._id+".png";
	 currURL = checkInURL+tempTick._id;
	 qrImage
     .image(currURL, {type:'png', size: 20})
	 .pipe(fs.createWriteStream('./public'+tempTick.imgName));		
	 //console.log("pushing "+tempTick+" into docs");
	 docs.push(tempTick);
 }//for initializing docs	  
 
    //A. write insert opertaion into tickets
	var bulkTicketInserts = docs.map(function (ticket) { 
    return { 
        "insertOne": {  "document":  ticket }           
    }   //return  
}); 
    Ticket.bulkWrite(bulkTicketInserts, function(err, tickets){
		if (err) {
			throw (err);
		} else {
	  var bulkEventUpdates = docs.map(function (ticket) { //collection might actually be tickets
	  //console.log("the value that ticket has", ticket);
	  //console.log("The before eventTicket id: "+ticket.eventTicketId+" and it is a "+typeof(ticket.eventTicketId));
	  //var eventTicketQuery = toObjectId(ticket.eventTicketId);
	  //console.log("The after eventTicket id: "+eventTicketQuery+" and it is a "+typeof(eventTicketQuery));
      return { 	     
        "updateOne": { 
          "filter": { "_id": ticket.eventTicketId } ,              
          "update": { 
		  "$push": {"purchasedTickets":ticket._id},
		  "$inc": {"ticketQ": -1}
		  //"$inc": {"eventTickets[ticket.ticketIndex].ticketQ": -1}
		  }//update  query
        }//updateOne obj          
      }//return
    });
		EventTicket.bulkWrite(bulkEventUpdates, function(eventErr, events){
			if (eventErr) {
				throw eventErr;
			} else {
				//console.log("wrote", events);
				res1.send(events);
			}//else update success
		});
		}//else ticket creation success 
	})
	//B. update events collection. Each iteration: 1. push ticket._id into purchased tickets.
	//and 2. $dec numRemaining by 1 for each purchase	

 
 
 /*Ticket.insertMany(docs, function(error, result){
 if (error) {
 console.log("reached error route");
 console.log(error);
  } else {
    console.log("added tickets? result is", result);
	var idQuery = toObjectId(result[0]._id);
	var ids = [];
	var priceSum = 0;
	for (var i=0;i<result.length;i++) {
		ids.push(result[i]._id);
		priceSum+=result[i].ticketPrice;
	}//for gathering ids and total revenue
	//Event.findOneAndUpdate
    // res.send(result);
    res1.send(result);
    }//else
  });*/
 
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
	 console.log("reached result route with ", ticket);
      res.send(ticket);
		}
	});
})//tickets check in route for scanning tickets 
///////////////////////// EVENT TICKETS/ TICKET DEFS SUB-ROUTES ///////////////////////////////////////


router.delete('/:id',function(req,res){
  //TODO: delete associated  qr image. make sure the image address is passed
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

