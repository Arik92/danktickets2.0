app.controller('ticketCtrl', ['createService', '$scope', '$window', '$stateParams', '$state', '$timeout', '$location',
	function (createService, $scope, $window, $stateParams, $state, $timeout, $location) {
		this.$onInit = () => {
			$scope.params = $stateParams;
			//localStorage.removeItem('dankCart');
			 var storageCart= localStorage.getItem('dankCart');
			 console.log("storage cart from cart",storageCart);
			if (storageCart) {
             $scope.dankCart = JSON.parse(storageCart);
			 console.log( $scope.dankCart);
			} 			
			//$scope.tickets = tickets;
			//console.log($scope.params);      
		}//onInit 
		$scope.showTickets = function () {
			console.log("Ticketss", $scope.eventTickets);
		}		
		$scope.remove = function (index) {
			$scope.dankCart.splice(index, 1);
			localStorage.setItem('dankCart', $scope.dankCart);
		}
	}]);