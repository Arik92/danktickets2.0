app.factory('pdfService', [function(){
  var pdfService = {};

  pdfService.printTickets = function(tickets, username, img) { //,userNAME optionally,  
  // Recipt - Who bought it, for how much, user's name; etc'     
      //var str = userName+'.pdf'; //optinoally name the reciept after the user. or after first ticket?
	  var doc = new jsPDF();
			doc.text('Name: '+ username+' for: ', 10, 10);			
			tickets.forEach(function(ticket, i){
			//var imgData = 'data:image/jpeg;base64,./public'+img;
			//console.log("img data ", imgData);
            doc.text(30, 20 + (i * 10), 
              "Event Name: " + ticket.title +
              " Price: " + ticket.ticketPrice +
			  " Date: " + ticket.eventId.startDateDisplay + 
			  " QR code: ");
			  doc.addImage(img, 'png', 15, 40, 180, 160);
             });			 
            //doc.text('Hello world!', 10, 10); 
	doc.save('merchantTickets.pdf'); 
  }//printing ticket array	  

  return pdfService;
}]);