app.factory('pdfService', [function(){
  var pdfService = {};

  pdfService.printTickets = function(tickets) { //,userNAME optionally,  
  // Recipt - Who bought it, for how much, user's name; etc'
    for (var i=0;i<tickets.length;i++) {
      //var imgData = 'data:image/jpeg;base64,/'+tickets[i].imgName?;
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
	}//for printing ticets
	doc.save('merchantTickets.pdf'); 
  }//printing ticket array	  

  return pdfService;
}]);