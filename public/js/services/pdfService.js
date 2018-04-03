app.factory('pdfService', [function(){
  var pdfService = {};

  pdfService.printTickets = function(tickets) { //,userNAME optionally,
  // OPTIONAL: get user's details through the userService, and serve that as its details 
  // Also optinoal: after printing, add the tickets to the user's inventory?
  // Recipt - Who bought it, for how much, user's name; etc'
  //  
      //var str = userName+'.pdf'; //optinoally name the reciept after the user. or after first ticket?
	  var doc = new jsPDF();
			//doc.text('Reciept for events by: '+ merchant.organizer+' for: ', 10, 10);			
			tickets.forEach(function(ticket, i){
            doc.text(30, 20 + (i * 10), 
              "Event Name: " + ticket.title +
              " Price: " + ticket.ticketPrice +
			  " Quantity: " + ticket.howMany)
             });
            //doc.text('Hello world!', 10, 10);
            doc.save('merchantTickets.pdf'); 	
  }	  

  return pdfService;
}]);