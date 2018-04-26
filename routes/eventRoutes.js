var express = require('express');
var router = express.Router();
var Event = require("../models/eventmodel");
var User = require("../models/usermodel");
var EventTicket = require("../models/eventticketmodel");

//var Profile = require("../models/")

function toObjectId(string) {
	var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(string);
}

router.get('/', function (req, res, next) {
  Event.find({"ongoing": true}).populate('organizer').exec(function(err, events){
    if (err) {
      console.error(err);
    } else {
      res.send(events);
    }
  })//exec()
});//get all events that are ongoing(have not ended and have tickets) and populate the publisher field

router.get('/findByOwner/:id', function(req, res, next){ //optional: edit only ongoing events
	var idQuery = toObjectId(req.params.id);
  Event.find({owner: idQuery}).populate('owner organizer').exec(function(err, events){
    if (err) {
      console.error(err);
    } else {      
      res.send(events);
    }
  })//exec()
}) // get event by OWNER ID.

router.get('/findByOrganizer/:id', function(req, res, next){
	var organizerQuery = toObjectId(req.params.id);
  Event.find({organizer: organizerQuery}).populate({
	  path: 'eventTickets',
	  populate: {
		  path: 'purchasedTickets'
		  }
  }).exec(function(err, events){
    if (err) {
      console.error(err);
    } else {
      		
      res.send(events);
    }
  })//exec()
}) // get event by Organizer name.

router.get('/findById/:id', function(req, res, next){
  Event.find({_id: req.params.id}).populate('organizer eventTickets').exec(function(err,foundEvent){
    if (err) {
      console.error(err);
    } else {
      console.log("found events(by id)", foundEvent);      
      res.send(foundEvent);
    }
  })//exec()
}) // get event by OWNER id.

router.get('/eventTickets/:id', function(req, res, next){
  Event.findOne({_id: req.params.id}, function(err, resultEvent){
	  if (err) {
		  console.log("error fetching event tickets");
		  console.log(err);
	  } else {
		  console.log("event", resultEvent);
		  console.log("result tickets ",resultEvent.eventTickets);
		  var tickets = [];
		  for (var i=0;i<resultEvent.eventTickets.length;i++) {
			tickets.push(resultEvent.eventTickets[i]);
		}//for
      res.send(tickets);
		  //res.send(resultEvent.eventTickets);
	  }//else 
  })//find CB 
}) // get tickets only by event id.

router.get('/searchByActivity/:type', function(req, res, next){
  Event.find({type: req.params.type}, function(err, resultEvents){
    if (err) {
      console.log(err);
    } else {
      res.send(resultEvents);
    }//else
  })//findCb
}) //NOTE: get event by a specific type criteria. for future use

function escapeRegex (text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#s]/g, "\\$&");
}
router.get('/generalSearch/:searchQuery', function(req, res, next){
	//var queryPattern = /req.params.query/;
	//Event.find().then(function(error, 
  /*Event.find({
	  $or: 
	  [{
		  title: {$regex: req.params.searchQuery, $options: 'i'}
		  },{
		  description: {$regex: req.params.searchQuery, $options: 'i'}
		  },{
		  name: {$regex: req.params.searchQuery, $options: 'i'}
	  }]
		  }).populate('organizer').exec(function(err, resultEvents){
    if (err) {
      console.log(err);
    } else {
      res.send(resultEvents);
    }//else
  })//exec */
	Event.find({ongoing: true}).populate({
		path: 'organizer',
		select: 'name'
		}).exec(function(err, resultEvents) {	
		if (err) {
			res.send(err);
	} else {
		console.log("results ", resultEvents);
		var patt = new RegExp(escapeRegex(req.params.searchQuery), 'gi');
		console.log("regex is", patt);
		var searchResults =[];
		for (var i=0;i<resultEvents.length;i++) {			
			if ((patt.test(resultEvents[i].organizer.name))||(patt.test(resultEvents[i].description))||(patt.test(resultEvents[i].title))) {
			searchResults.push(resultEvents[i]);	
			//TODO: request 1 - same but without the organizer.req2 - where the organizer name matches the pattern
			}//if query was found in either the title, description, or organizer fields 			
		}//for i 
		res.send(searchResults);
		}//else
	})// event cb 	
}) //NOTE: get event by a specific type criteria. for future use

router.post('/', function (req, res1, next) {	
  req.body.eventTickets = [];
  var tempEventTicket;
  var docs = [];
  for (var i=0;i<req.body.ticketDefs.length;i++) {
	//create new eventTicket object
	tempEventTicket = new EventTicket(req.body.ticketDefs[i]);
	docs.push(tempEventTicket);
	req.body.eventTickets.push(tempEventTicket._id);
  }//for creating eventTickets. inb4 insertMany  
    //eventTicks initiated. create actua event
	var e = new Event(req.body);
    //e.image = req.file.filename; //TODO: save some default image
    e.save(function(error, result){
      if (error) {
        console.log("reached error route");
        console.log(error);
      } else {
		  for (i=0;i<docs.length;i++) {
			  docs[i].eventId = result._id;
		  }
		  EventTicket.insertMany(docs, function(manyError, manyRes){
			   res1.send(result);
			   })//insertmany callback 
        console.log("reached result route");
        // res.send(result);
       
      }//else
    });
 
})//regular uploads(no pic provided)

router.delete('/:id',function(req,res){
  //TODO: delete associated image. make sure the image address is passed
  Event.findOneAndRemove({ _id: req.params.id }, function(err, evt) {
    if (err) {
      console.log(err);
      res.send(err);
	 }  else {
		 EventTicket.remove({"eventId": req.params.id}, function(delErr, delTicks){
			 if (delErr) {
				 throw (delErr)
			 } else {
				 console.log("deleted event and eventTickets");
				 res.send(evt);
			 }
		 })
     	  //delete associated image 	   
	   /*var fs = require('fs');	   
	   console.log(event.image);
       var addressToDelete = 'public'+event.image;
	   fs.unlink(addressToDelete,function(response){
		   console.log("deleted event ", response);
        //res.send({error_code:0,err_desc:null});
        }); //TODO: need the path for the file*/
	   
      res.send(event);
		}//else
	});
});
router.delete('/eventTickets/:id',function(req,res){  
  EventTicket.findOneAndRemove({ _id: req.params.id }, function(err, tick) {
    if (err) {
      console.log(err);
      res.send(err);
	 }  else {
        Event.findOneAndUpdate({_id: tick._id},{$pull: {"eventTickets._id": req.params.id}},{new:true} ,function(updateErr, updateRes){
			 res.send(tick);
		})		      
		}//else
	})
}); //deleting a single EVENT-ticket

router.put('/eventTickets/:id',function(req,res){  
  EventTicket.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function(err, tick) {
    if (err) {
      console.log(err);
      res.send(err);
	 }  else {	     	  	   
      res.send(tick);
		}//else
})
});  //updating a single EVENT-ticket

router.put('/:id', function(req, res1, next) {
	var tempEventTicket;
    var docs = [];
    for (var i=0;i<req.body.newTickets.length;i++) {
	//create new eventTicket object
	tempEventTicket = new EventTicket(req.body.newTickets[i]);
	docs.push(tempEventTicket);
	req.body.event.eventTickets.push(tempEventTicket._id);
  }//for creating eventTickets. inb4 insertMany          
  Event.findByIdAndUpdate(req.params.id, req.body.event, { new: true }, function(error, evt) {
    if (error) {
     console.error(error)
     return next(error);
    } else {
		EventTicket.insertMany(docs, function(manyError, manyRes){
			   res1.send(evt);
			   })//insertmany callback      
   }//else
  });//mongo CB
})// put route - without updating pictures

module.exports = router;

// router.get('/', function (req, res, next) {
//   Event.find(function(error, result){
//     if (error) {
//       console.log(error);
//     } else {
//       res.send(result);
//     }//else
//   })//find()
// });//get all events that were ever published

// router.get('/:id', function(req, res, next){
//   Event.find({publisher: req.params.id}, function(err, resultEvents){
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(resultEvents);
//     }//else
//   })//findCb
// }) // get event by publisher

// router.get('/searchByActivity/:type', function(req, res, next){
//   Event.find({type: req.params.type}, function(err, resultEvents){
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(resultEvents);
//     }//else
//   })//findCb
// }) //NOTE: get event by a specific type criteria. for future use

// router.post('/upload', function (req, res1, next) {
//   upload(req,res1,function(err){
//              if(err){
//                   res1.json({error_code:1,err_desc:err});
//                   return;
//              }
//              console.log("request to work with is", req.body);
//              console.log("file name:", req.file.filename);
//               var e = new Event(req.body.event);
//               e.image = req.file.filename;
//               e.save(function(error, result){
//                 if (error) {
//                   console.log("reached error route");
//                   console.log(error);
//                 } else {
//                   console.log("reached result route");
//                   // res.send(result);
//                   res1.send({error_code:0,err_desc:null, file_name: req.file.filename});
//                 }//else
//               });
//          })
//      });// path for regular uploads

// router.post('/', function (req, res1, next) {
//  var e = new Event(req.body);
//  //e.image = req.file.filename; //TODO: save some default image
//  e.save(function(error, result){
//  if (error) {
//  console.log("reached error route");
//  console.log(error);
//   } else {
//     console.log("reached result route");
//     // res.send(result);
//     res1.send(result);
//     }//else
//   });
// })//regular uploads(no pic provided)

// router.delete("/:id",function(req,res){
//   //TODO: delete associated image
//   Event.findOneAndRemove({ _id: req.params.id }, function(err, event) {
//     if (err) {
//       console.log(err);
//       res.send(err);
//     }  else {
//       console.log(event);
//       res.send(event);
//     }
// });
// });
// router.post('/deleteAndUpload', function(req, res1, next) {
//   //TODO: check if the image has changed. if it did, delete and replace it with the new one
//   upload(req,res1,function(err){
//            if(err){
//                 res.json({error_code:1,err_desc:err});
//                 return;
//            }
//            console.log("request to work with is", req.body);
//            if (req.body.event.imgPath!="/img/uploads/undefined") {
//            var fs = require('fs');
//            var addressToDelete = 'public/img/uploads/'+req.body.event.image
//          }//if there's no image, there is nothing to delete. TODO: change to default picture
//            console.log("file name:", req.file.filename);
//            req.body.event.image = req.file.filename;
//            Event.findByIdAndUpdate(req.body.event._id, req.body.event, { new: true }, function(error, event) {
//              if (error) {
//                console.error(error)
//                return next(error);
//              } else {
//                if (addressToDelete) {
//                  fs.unlink(addressToDelete,function(response){
//                    res1.send({error_code:0,err_desc:null, file_name: req.file.filename});
//                  }); //TODO: need the path for the file
//                } else {
//                res1.send({error_code:0,err_desc:null, file_name: req.file.filename});
//              }//else file wasnt deleted
//             }//else mongo
//            });
//          }); // path for updates
//        })// put request for also updating image

// router.put('/:id', function(req, res1, next) {
//   console.log("request body is", req.body);
//   Event.findByIdAndUpdate(req.body._id, req.body, { new: true }, function(error, event) {
//     if (error) {
//      console.error(error)
//      return next(error);
//     } else {
//      res1.send(event);
//    }//else
//   });//mongo CB
// })// put route - without updating pictures
// module.exports = router;
