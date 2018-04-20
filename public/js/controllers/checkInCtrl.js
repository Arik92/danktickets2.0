app.controller('checkInCtrl', ['purchaseService', '$scope', '$stateParams','$timeout','$location', function (purchaseService, $scope, $stateParams, $timeout, $location) {

    this.$onInit = function() {
      //$scope.params = $stateParams.ticketId;
      //console.log($scope.params);      
	  purchaseService.getSingleTicket($stateParams.ticketId).then(function(result){
		  $scope.ticket = result;
		  console.log("result ticket", $scope.ticket);		
	  });
    }; 
	
    $scope.checkIn = function(merchId) {
		purchaseService.checkIn($stateParams.ticketId, merchId).then(function(result){
			if (!result) {
				alert("error checking in!");
			} else {
			alert("Ticket has now been checked in successfully! redirecting");
            $timeout(function () {
              $location.path('/');
            }, 500);
		  }//else 
	    });//checking CB
	};//checkin
	
  }]);