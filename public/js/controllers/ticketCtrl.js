app.controller('ticketCtrl', ['createService', '$scope', '$window', '$stateParams', '$state', '$timeout', '$location',
	function (createService, $scope, $window, $stateParams, $state, $timeout, $location) {
		this.$onInit = () => {
			//localStorage.removeItem('dankCart');// PANIC button
			$scope.params = $stateParams;
			var storageCart = localStorage.getItem('dankCart');
			console.log("storage cart from cart", storageCart);
			if (storageCart) {
				$scope.dankCart = JSON.parse(storageCart);
				console.log($scope.dankCart);
			}
			//$scope.tickets = tickets;
			//console.log($scope.params); 
			getDankCartTotal();
		}//onInit 
		$scope.showTickets = function () {
			console.log("Ticketss", $scope.eventTickets);
		}
		$scope.remove = function (index) {
			$scope.dankCart.splice(index, 1);
			localStorage.setItem('dankCart', JSON.stringify($scope.dankCart));			
			getDankCartTotal();
		}
		$scope.clear = function () {
			console.log("removing", localStorage.getItem('dankCart'));	
			localStorage.removeItem('dankCart');	
			$scope.dankCart = [];
			$scope.dankCartTotal = 0;
		}

		function getSubtotal(item) {
			return item.howMany * item.ticketPrice;
		}

		function getDankCartTotal() {
			var total = 0;
			if ($scope.dankCart!=null) {
				total = $scope.dankCart.reduce((sum, item) => {
					return sum += getSubtotal(item);
				}, 0)
			}//if
			$scope.dankCartTotal = total;
		}

	}]);