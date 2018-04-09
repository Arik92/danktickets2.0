app.controller('checkInCtrl', ['purchaseService', '$scope', '$stateParams','$timeout', function (purchaseService, $scope, $stateParams, $timeout) {

    /*this.$onInit = function() {
      $scope.params = $stateParams.ticketId;
      console.log($scope.params);      
    } *///not sure if neccesary
	
    $scope.checkIn = function(organizerId) {
		purchaseService.checkIn($stateParams.ticketId, organizerId).then(function(result){
			console.log("Ticket has now been check in successfully");
			console.log(result);
		});
	}
  }]);