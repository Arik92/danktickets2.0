app.factory('createService', function($http){
  //  var config = require('../config.js');
  var currentTickets = [];

  var getTempTicks = function() {
    return currentTickets;
  }//returnTemp

  var addticket = function(ticket) {
    currentTickets.push(ticket);
  }//addTicket

  var deleteTempTick = function(index) {
    currentTickets.splice(index, 1);
  }

  var postEvent = function(event) {
  return $http.post('/events', event).then(function(result) {
    console.log("event added! ", result.data);
    return result.data;
  }, function(error) {
    throw (error);
  }) // add promise
}// post event

var getEvents = function() {
  return $http.get('/events').then(function(result) {
    console.log("result from create service: ");
    console.log(result.data);
    return result.data;
  }, function(error) {
    throw (error);
  }) // add promise
} // get all current events. NOTE: In the future its possible to have event states like voutr. should that be wanted.
// Do they want to view past events?

var getEventsbyUsername = function(userName) {
  return $http.get('/events/' +userName)
    .then(function(response) {
      return response.data;
    }, function(err) {
      console.error(err);
    });
}// getting events by a certain username, IE publisher

var deleteEvent = function(oId) {
  return $http.delete('/events/' + oId).then(function(result) {
    console.log("ongoing battle that was deleted: ", result);
    return result.data; //??
  }, function(error) {
    throw (error);
  }) //promise callbacks
} // delete a battle

var updateEvent = function(id, evnt) {
  // the event
  return $http.put('/events/' + event._id, event).then(function(result) {
    return result.data;
  }, function(error) {
    throw error;
  })
}
var vote = function(battle, userId) {
  return $http.put('/btls/' + battle._id + '/' + userId, battle).then(function(result) {
    return result.data;
  }, function(error) {
    console.error(error);
  });
} //

var getTickets = function(eventId) {
  return $http.get('/rating/' + id).then(function(result) {
    return result.data;
  }, function(error) {
    throw (error);
  }) //promise callbacks
} //getAll ratings of a user


var updateTickets = function(battle, vidNo) {
  return $http.put('/rating/' + battle._id + '/' + vidNo).then(function(result) {
    return result.data;
  }, function(error) {
    throw error;
  })
}

  // function getKey() {
  //   return config.MAPS_API_KEY;
  // };
  return {
    getTempTicks: getTempTicks,
    addticket: addticket,
    deleteTempTick: deleteTempTick,
    postEvent: postEvent
  };
});
