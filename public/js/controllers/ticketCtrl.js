app.controller('ticketCtrl', ['purchaseService','$rootScope','$scope', '$window', '$stateParams', '$state', '$timeout', '$location',
	function (purchaseService,$rootScope, $scope, $window, $stateParams, $state, $timeout, $location) {
		this.$onInit = function() {
			//localStorage.removeItem('dankCart');// PANIC button			
			console.log("rootScope", $rootScope.currentUser);
			var config = require('../config.js');
            Payfields.config.apiKey = config.MERCHANT_PUBLIC_API_KEY;
			console.log('key?',Payfields.config.apiKey);
			purchaseService.getCart($rootScope.currentUser).then(function(result){
				if (result) {
				$scope.dankCart = result;				
				} else {
					$scope.dankCart = [];					
				}				
				$scope.showCheckout = false;
				getDankCartTotal();
			});						
		}//onInit 
		/*$scope.showTickets = function () {
			console.log("Ticketss", $scope.eventTickets);
		}*/// ???
		$scope.remove = function (merchantIndex, ticketIndex) {
			console.log("tickets to be spliced", $scope.dankCart[merchantIndex].tickets);
			if($scope.dankCart[merchantIndex].tickets.length>0) {
			 $scope.dankCart[merchantIndex].tickets.splice(ticketIndex, 1);
             if ($scope.dankCart[merchantIndex].tickets.length===0){
				 $scope.dankCart.splice(merchantIndex, 1);
				 console.log("cart after merchant splice",$scope.dankCart);
			 }	//if that ticket cart is empty			 
			 purchaseService.saveCart($rootScope.currentUser, $scope.dankCart).then(function(result){
			     console.log("updated!");
				 getDankCartTotal();
			});			
			}
		}
		$scope.clear = function () {
			console.log("removing", $scope.dankCart);	
			$scope.dankCart = [];
			purchaseService.saveCart($rootScope.currentUser, $scope.dankCart).then(function(result){
				console.log("cleared");
				$scope.dankCartTotal = 0;
			});			
			
		}
		
		function getDankCartTotal() {
			var total = 0;
			console.log("cart now", $scope.dankCart);
			if ($scope.dankCart.length>0) {
				for (var i=0;i<$scope.dankCart.length;i++) {
					for (var j=0;j<$scope.dankCart[i].tickets.length;j++) 
					{
						total+= $scope.dankCart[i].tickets[j].howMany*$scope.dankCart[i].tickets[j].ticketPrice;
					}//for looping tickets 
				}//for looping merchants
			}//if
			$scope.dankCartTotal = total;
		}
		function getMerchantSum(tickets) {
			var sum = 0;
			for (var i=0;i<tickets.length;i++) {
				sum+=tickets[i].howMany*tickets[i].ticketPrice;
			}//for 
			console.log("merchant sum to be charged", sum);
			return sum;
		}//getMerchantSum 
		
		$scope.checkout = function(merchant) {
			console.log("merhcant", merchant);			
			$scope.showCheckout = true;
			Payfields.config.merchant = merchant.merchantId;
			Payfields.config.amount = getMerchantSum(merchant.tickets);
			// get information about the organizer here
		}//checkout
		$scope.pay = function(){
			console.log("attempting payment");
			Payfields.submit();
		}//pay
		//console.log("control payfields?", Payfields.config.amount);
		/*$scope.buyTickets = function(){
			purchaseService.buyCart($scope.dankCart, ).then(function(err, res){
				console.log("purchased!");
			}) //cb 
			console.log('buying tickets');
		}*/

	}]);