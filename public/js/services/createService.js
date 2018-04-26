app.factory('createService', ['$http', function ($http) {

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
      //console.log("result from create service: ", result.data);     
      return result.data;
    }, function (error) {
      console.error(error);
      // throw (error);
    }) // add promise
  } // get all current events. 

  var getEventsByOwner = function (id) {
    //console.log("id by service is", id);
    return $http.get('/events/findByOwner/' + id)
      .then(function (response) {
        return response.data;
      }, function (err) {
        console.error(err);
      });
  }// getting events by a certain publisher
  
  var getEventsByOrganizer = function (id) {    
    return $http.get('/events/findByOrganizer/' + id)
      .then(function (response) {
        return response.data;
      }, function (err) {
        console.error(err);
      });
  }// getting events by a certain publisher
  
   var getTicketsByMerchant = function (id) {    
    return $http.get('/tickets/merchTickets/' + id)
      .then(function (response) {
        return response.data;
      }, function (err) {
        console.error(err);
      });
  }// getting events by a certain publisher
  
  
  var getAttendees = function (id) {    
    return $http.get('/tickets/eventTickets/' + id)
      .then(function (response) {
        return response.data;
      }, function (err) {
        console.error(err);
      });
  }// getting tickets for a specific event

  var postEvent = function (evt) {
	  console.log("Im submitting", evt);
    return $http.post('/events', evt).then(function (result) {
      //console.log("service result");
      return result.data;
    }, function (error) {
      console.error(error);
      throw (error);
    }) // add promise
  }// post event

  var updateEvent = function (evt, newTickets) {
	  var obj = {
		  "event": evt,
		  "newTickets": newTickets
	  }//obj/req.body definition
    return $http.put('/events/' + evt._id, obj).then(function (result) {
      return result.data;
    }, function (error) {
      throw error;
    })
  }
  var deleteEvent = function (id) {
    return $http.delete('/events/' + id).then(function (result) {
      console.log("event that was deleted: ", result);
      return result.data; //??
    }, function (error) {
      throw (error);
    }) //promise callbacks
  } // delete an event

  var getEventTickets = function (id) {
    return $http.get('/events/eventTickets/' + id).then(function (result) {
      //console.log("service result", result);
      return result.data;
    }, function (error) {
      throw (error);
    })//get ticet CB
  }//get event tickets by ID
 
   var updateEventTicket = function (ticket) {
    return $http.put('/events/eventTickets/' + ticket._id, ticket).then(function (result) {
      //console.log("service result", result);
      return result.data;
    }, function (error) {
      throw (error);
    })//get ticet CB
  }//get event tickets by ID
  
   var deleteEventTicket = function (id) {
    return $http.delete('/events/eventTickets/' + id).then(function (result) {
      //console.log("service result", result);
      return result.data;
    }, function (error) {
      throw (error);
    })//get ticet CB
  }//get event tickets by ID

  var generalSearch = function (searchQuery) {
	  //searchQuery = '/'+searchQuery+'/'+i;
	  console.log('service patt', searchQuery);
    return $http.get('/events/generalSearch/' + searchQuery).then(function (result) {
		console.log("SERVICE results", result);
      return result.data;
    }, function (error) {
      throw (error);
    });
  }



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
      image: "../../img/banner-carousel/Chalice.jpg",
      bgColor: 'linear-gradient(#1eb089 0%, #7c49ab 100%, #7db9e8 100%)',
      title: 'Chalice Palace',
      startDateDisplay: 'Tue, Feb 22',
      endDateDisplay: 'Tue, Feb 26',
      startTime: '7:00 PM',
      endTime: '11:00 PM',
      location: {locationName: 'San Diego'},
      organizer: { name: 'The Undertaker' }
    },
    {
      image: "../../img/banner-carousel/meet-art-sesh.jpg",
      bgColor: 'linear-gradient(red 0%, #7c49ab 100%, #7db9e8 100%)',
      title: 'Meet Art Sesh',
      startDateDisplay: 'Thu, Mar 15',
      endDateDisplay: 'Thu, Mar 16',
      startTime: '7:00 PM',
      endTime: '11:00 PM',
      location: {locationName: 'San Diego'},
      organizer: { name: 'The Rock' }
    },
    {
      image: "../../img/banner-carousel/cannabis-cup.jpg",
      bgColor: 'linear-gradient(blue 0%, #7c49ab 100%, #7db9e8 100%)',
      title: 'Cannabis Cup',
      startDateDisplay: 'Sun, April 01',
      endDateDisplay: 'Sun, April02',
      startTime: '7:00 PM',
      endTime: '11:00 PM',
      location: {locationName: 'San Diego'},
      organizer: { name: 'Stone Cold Steve Austin' }
    },
    {
      image: "../../img/banner-carousel/420-festival.jpg",
      bgColor: 'linear-gradient(#1eb089 0%, #7c49ab 100%, #7db9e8 100%)',
      title: '420 Fest',
      startDateDisplay: 'Fri, Jan 26',
      endDateDisplay: 'Fri, Jan 28',
      startTime: '7:00 PM',
      endTime: '11:00 PM',
      location: {locationName: 'San Diego'},
      organizer: { name: 'Triple H' }
    }
  ];

  return {
    dummyEvents: dummyEvents,
    postEvent: postEvent,
    getEvents: getEvents,
    getEventsByOwner: getEventsByOwner,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent,
    getEventById: getEventById,    
    generalSearch: generalSearch,
	getEventTickets: getEventTickets,
	getAttendees: getAttendees,
	getEventsByOrganizer: getEventsByOrganizer,
	getTicketsByMerchant: getTicketsByMerchant,
	updateEventTicket: updateEventTicket,
	deleteEventTicket: deleteEventTicket
  };
}]);
