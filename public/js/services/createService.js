app.factory('createService', function($http){

  var getEventById = function(id) {
	 return $http.get('/events/findById/'+id).then(function(result) {
    console.log("result from create service: ");
    console.log(result.data);
    return result.data;
  }, function(error) {
    console.error(error);
    // throw (error);
  }) // add promise
  };

var getEvents = function() {
  return $http.get('/events').then(function(result) {
    console.log("result from create service: ");
    console.log(result.data);
    return result.data;
  }, function(error) {
    console.error(error);
    // throw (error);
  }) // add promise
} // get all current events. NOTE: In the future its possible to have event states like voutr. should that be wanted.
// Do they want to view past events?

var getEventsByOwner = function(userName) {
  console.log("id by service is",userName);
  return $http.get('/events/' +userName)
    .then(function(response) {
      return response.data;
    }, function(err) {
      console.error(err);
    });
}// getting events by a certain publisher

var postEvent = function(event) {
return $http.post('/events', event).then(function(result) {
  console.log("service result");
  return result.data;
}, function(error) {
  console.error(error);
  throw (error);
}) // add promise
}// post event

var updateEvent = function(event) {
  return $http.put('/events/' + event._id, event).then(function(result) {
    return result.data;
  }, function(error) {
    throw error;
  })
}
var deleteEvent = function(id) {	
  return $http.delete('/events/' + id).then(function(result) {
    console.log("event that was deleted: ", result);
    return result.data; //??
  }, function(error) {
    throw (error);
  }) //promise callbacks
} // delete an event


// var vote = function(battle, userId) {
//   return $http.put('/btls/' + battle._id + '/' + userId, battle).then(function(result) {
//     return result.data;
//   }, function(error) {
//     console.error(error);
//   });
// } //
//
// var getTickets = function(eventId) {
//   return $http.get('/rating/' + id).then(function(result) {
//     return result.data;
//   }, function(error) {
//     throw (error);
//   }) //promise callbacks
// } //getAll ratings of a user
//
//
// var updateTickets = function(battle, vidNo) {
//   return $http.put('/rating/' + battle._id + '/' + vidNo).then(function(result) {
//     return result.data;
//   }, function(error) {
//     throw error;
//   })
// }

    return {    
    postEvent: postEvent,
    getEvents: getEvents,
    getEventsByOwner: getEventsByOwner,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent,    
	getEventById: getEventById
  };
});
