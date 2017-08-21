app.factory('createService', function(){
  // var config = require('../config.js');
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
  return {
    getTempTicks: getTempTicks,
    addticket: addticket,
    deleteTempTick: deleteTempTick
  };
});
