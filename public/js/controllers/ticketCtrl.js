app.controller('ticketCtrl', ['createService', '$scope', '$window', '$stateParams', '$state', '$timeout', '$location',
  function (createService, $scope, $window, $stateParams, $state, $timeout, $location) {

    this.$onInit = () => {
      $scope.params = $stateParams;
	  initTickets();
	  //$scope.tickets = tickets;
      //console.log($scope.params);      
    }//onInit 
	function initTickets() {
	  createService.getTickets($stateParams.id).then(function(res, err){
		if (err) {
			console.log("error fetching specific event by id");
		} else {						
			//$scope.eventTickets = res[0];	
			//console.log("id",$stateParams.id);			
			console.log("fetched tickets", res);			
		}//else
	  });//getEventById
  }//initEvent	
  $scope.showTickets = function() {
	  console.log("Ticketss",$scope.eventTickets);
  }
	$scope.addToCart = function() {
		
	}
  }]);