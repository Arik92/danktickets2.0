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
		$scope.ticketsToAdd = 0;
  } //initialization  
  
  $scope.addToCart = function(ticket, numTickets) {
	  if ((numTickets>0)&&(ticket.ticketQ>=numTickets)) {//TODO: WHOLE VALUES ONLY
	  var cartTicket = {
		  'ticket': ticket,
		  'quantity': numTickets
	  }//cartObj creation
	  $scope.ticketCart.push(cartTicket);
	  $scope.ticketSum+=ticket.ticketPrice* numTickets;
	  } else {
		  alert("cannot add that many tickets!");
	  }//else 
  }//addToCart  - cart is for the user to mess with and make his order. this doest buy or reserve them yet!
	$scope.updateSum = function() {
		$scope.ticketSum = 0;
		for (var i=0;i<$scope.ticketCart.length;i++) {
			$scope.ticketSum+= $scope.ticketCart[i].ticketPrice*$scope.ticketCart[i].ticketQ;
		}//for 
	} //update sum to update any changes made to ticket quantities
	$scope.removeFromCart = function(index) {
		//$scope.ticketSum-=$scope.ticketCart[index].ticketPrice*$scope.ticketCart[index].ticketQ; feels DRY
	 $scope.ticketCart.splice(index, 1);
	 $scope.updateSum();
	}//rrmove from cart
  $scope.buyTickets = function(numTickets) {
	//TODO: check that the event has said number of tickets available. if it does, connect to socket and reserve tickets
	// have a request to update the db about and reserve said tickets 
	//
  }// this is where the server requests are sent
  
}]);
