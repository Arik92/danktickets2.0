app.factory('createService', function ($http) {

  var getEventById = function (id) {
    return $http.get('/events/findById/' + id).then(function (result) {
      console.log("result from create service: ");
      console.log(result.data);
      return result.data;
    }, function (error) {
      console.error(error);
      // throw (error);
    }) // add promise
  };

  var getEvents = function () {
    return $http.get('/events').then(function (result) {
      console.log("result from create service: ");
      console.log(result.data);
      return result.data;
    }, function (error) {
      console.error(error);
      // throw (error);
    }) // add promise
  } // get all current events. NOTE: In the future its possible to have event states like voutr. should that be wanted.
  // Do they want to view past events?

  var getEventsByOwner = function (userName) {
    console.log("id by service is", userName);
    return $http.get('/events/findByOwner/' + userName)
      .then(function (response) {
        return response.data;
      }, function (err) {
        console.error(err);
      });
  }// getting events by a certain publisher

  var postEvent = function (event) {
    return $http.post('/events', event).then(function (result) {
      console.log("service result");
      return result.data;
    }, function (error) {
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

  const dummyEvents = [
    {
      imgURL: "../../img/banner-carousel/Chalice.jpg",
      bgColor: 'linear-gradient(#1eb089 0%, #7c49ab 100%, #7db9e8 100%)',
      name: 'Chalice Palace',
      date: 'Tue, Feb 22',
      startTime: '7:00 PM',
      endTime: '11:00 PM',
      location: 'Santa Cruz, CA'
    },
    {
      imgURL: "../../img/banner-carousel/meet-art-sesh.jpg",
      bgColor: 'linear-gradient(red 0%, #7c49ab 100%, #7db9e8 100%)',
      name: 'Meet Art Sesh',
      date: 'Thu, Mar 15',
      startTime: '7:00 PM',
      endTime: '11:00 PM',
      location: 'Long Beach, CA'
    },
    {
      imgURL: "../../img/banner-carousel/805-oiler-sesh.jpg",
      bgColor: 'linear-gradient(blue 0%, #7c49ab 100%, #7db9e8 100%)',
      name: 'Oiler Fest',
      date: 'Sun, April 01',
      startTime: '7:00 PM',
      endTime: '11:00 PM',
      location: 'Oakland, CA'
    },
    {
      imgURL: "../../img/banner-carousel/taco-sesh-square.jpg",
      bgColor: 'linear-gradient(#1eb089 0%, #7c49ab 100%, #7db9e8 100%)',
      name: 'Taco Seshhh',
      date: 'Fri, Jan 26',
      startTime: '7:00 PM',
      endTime: '11:00 PM',
      location: 'Sherman Oaks, CA'
    }
  ];

  return {
    dummyEvents: dummyEvents,
    postEvent: postEvent,
    getEvents: getEvents,
    getEventsByOwner: getEventsByOwner,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent,
    getEventById: getEventById
  };
});
