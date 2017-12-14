app.controller('eventCtrl',['$scope' ,'$rootScope','$stateParams','createService', function($scope,$rootScope, $stateParams, createService){
	console.log("state param for event", $stateParams);
	function initEvent() {
	  createService.getEventById($stateParams.id).then(function(res, err){
		if (err) {
			console.log("error fetching specific event by id");
		} else {
			console.log("fetched event is", res[0]);
			$scope.event = res[0];       
		}//else
	  });//getEventById
  }//initProfs
	this.$onInit = () => {
		var socket = io(); //might move someplace else
		initEvent();   		
		$scope.ticketCart = [];
		$scope.ticketSum = 0;
  } //initialization  
  
  $scope.addTocart = function(ticket, numTickets) {
	  if ((numTickets>0)&&(ticket.ticketQ>=numTicks)) {//TODO: WHOLE VALUES ONLY
	  var cartObj = {
		  'ticketName': ticket.ticketName,
		  'quantity': numTickets
	  }
	  $scope.ticketCart.push(cartObj);
	  $scope.ticketSum+=ticket.price* numTickets;
	  } else {
		  alert("cannot add that many tickets!");
	  }//else 
  }//addToCart  - cart is for the user to mess with and make his order. this doest buy or reserve them yet!
	$scope.removeFromCart = function(index, howmany
  $scope.buyTickets = function(numTickets) {
	//TODO: check that the event has said number of tickets available. if it does, connect to socket and reserve tickets
	// have a request to update the db about and reserve said tickets 
	//
  }// this is where the server requests are sent
  
}]);
