app.factory('createService', function($http){
  //  var config = require('../config.js');
  var currentTickets = [];

  function getTempTicks() {
    return currentTickets;
  }//returnTemp

  function addticket(ticket) {
    currentTickets.push(ticket);
  }//addTicket

  function deleteTempTick(index) {
    currentTickets.splice(index, 1);
  }
  function postEvent() {
  return $http.post('/event').then(function(result) {
    console.log("photo saved and set!");
    console.log(result.data);
    return result.data;
  }, function(error) {
    throw (error);
  }) // add promise
}// post event

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
