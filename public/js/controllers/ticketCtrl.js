app.controller('ticketCtrl', ['purchaseService','$rootScope','$scope', '$window', '$stateParams', '$state', '$timeout', '$location',
	function (purchaseService,$rootScope, $scope, $window, $stateParams, $state, $timeout, $location) {
		this.$onInit = () => {
			//localStorage.removeItem('dankCart');// PANIC button			
			console.log("rootScope", $rootScope.currentUser);
			purchaseService.getCart($rootScope.currentUser).then(function(result){
				if (result) {
				$scope.dankCart = result;				
				} else {
					$scope.dankCart = [];					
				}				
				getDankCartTotal();
			});						
		}//onInit 
		$scope.showTickets = function () {
			console.log("Ticketss", $scope.eventTickets);
		}
		$scope.remove = function (index) {
			if($scope.dankCart.length>0)
			$scope.dankCart.splice(index, 1);
			purchaseService.saveCart($rootScope.currentUser, $scope.dankCart).then(function(result){
				console.log("updated!");
				getDankCartTotal();
			});			
			
		}
		$scope.clear = function () {
			console.log("removing", $scope.dankCart);	
			$scope.dankCart = [];
			purchaseService.saveCart($rootScope.currentUser, $scope.dankCart).then(function(result){
				console.log("cleared");
				$scope.dankCartTotal = 0;
			});			
			
		}

		function getSubtotal(item) {
			return item.howMany * item.ticketPrice;
		}

		function getDankCartTotal() {
			var total = 0;
			console.log("cart now", $scope.dankCart);
			if ($scope.dankCart.length>0) {
				total = $scope.dankCart.reduce((sum, item) => {
					return sum += getSubtotal(item);
				}, 0)
			}//if
			$scope.dankCartTotal = total;
		}
		
		/*$scope.buyTickets = function(){
			purchaseService.buyCart($scope.dankCart, ).then(function(err, res){
				console.log("purchased!");
			}) //cb 
			console.log('buying tickets');
		}*/

	}]);