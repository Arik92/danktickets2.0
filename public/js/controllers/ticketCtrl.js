app.controller('ticketCtrl', ['purchaseService','$rootScope','$scope', '$window', '$stateParams', '$state', '$timeout', '$location',
	function (purchaseService,$rootScope, $scope, $window, $stateParams, $state, $timeout, $location) {
		this.$onInit = function() {			
			//localStorage.removeItem('dankCart');// PANIC button			
			var config = require('../config.js');
            Payfields.config.apiKey = config.MERCHANT_PUBLIC_API_KEY;			
			purchaseService.getCart($rootScope.currentUser).then(function(result){
				if (result) {
				$scope.dankCart = result;				
				} else {
					$scope.dankCart = [];					
				}						
				//Payfields.reload();
				//Payfields.restore();                
                //console.log("errors?", Payfields.appendErrors());				
				//Payfields.restore();
				Payfields.fields = [
    {
      type: "number",
      element: "#number",
    },
    {
      type: "cvv",
      element: "#cvv",
    },
    {
      type: "name",
      element: "#name",
    },
    {
      type: "address",
      element: "#address",
    },
    {
      type: "expiration",
      element: "#expiration",
    }
  ];  
  Payfields.customizations = {
    style: {
      // All address fields class.
      ".address-input": {
        borderColor: "rgb(119,136,153)",
        borderStyle: "solid",
        borderBottomWidth: "1px"
      },
      // All fields
      ".input": {
        borderColor: "rgb(69,67,67)",
        borderStyle: "solid",
        borderBottomWidth: "1px"
      },
      // All error spans
      ".form-error": {
        color: "rgb(255, 0, 128)"
      },
      // Address error spans
      ".address-form-error": {
        color: "rgb(0,139,139)"
      }
    } 
  }
	            PayFields.appendIframe();
                //console.log("errors?", Payfields.appendErrors());
                //Payfields.restore();
               //Payfields.reload();
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
			sum*=100;// converting from cents to dollars
			console.log("merchant sum to be charged", sum);
			return sum;
		}//getMerchantSum 
		
		$scope.checkout = function(merchant) {			
			//Payfields.appendIframe();
			Payfields.reload();
			console.log("Payfields is", PayFields);
			//Payfields.reload();
			/*Payfields.fields = [
    {
      type: "number",
      element: "#number",
    },
    {
      type: "cvv",
      element: "#cvv",
    },
    {
      type: "name",
      element: "#name",
    },
    {
      type: "address",
      element: "#address",
    },
    {
      type: "expiration",
      element: "#expiration",
    }
  ];  
  Payfields.customizations = {
    style: {
      // All address fields class.
      ".address-input": {
        borderColor: "rgb(119,136,153)",
        borderStyle: "solid",
        borderBottomWidth: "1px"
      },
      // All fields
      ".input": {
        borderColor: "rgb(69,67,67)",
        borderStyle: "solid",
        borderBottomWidth: "1px"
      },
      // All error spans
      ".form-error": {
        color: "rgb(255, 0, 128)"
      },
      // Address error spans
      ".address-form-error": {
        color: "rgb(0,139,139)"
      }
    }
  };                    */            
            	
               
			console.log("merhcant", merchant); 
			$scope.showCheckout = !$scope.showCheckout;	          		
			Payfields.config.merchant = merchant.merchantId;
			Payfields.config.amount = getMerchantSum(merchant.tickets);
			// get information about the organizer here
  }//checkout
		$scope.pay = function(){
			console.log("attempting payment");
			console.log("field contents?", Payfields);
			Payfields.submit();
		}//pay
	Payfields.onSuccess = function(response) {
     // We will flash success response on button and clear the iframe
     // inputs
      $("#button").text("Success");
      $("#button").css(
      {"backgroundColor": "rgb(79,138,16)", "transition": "2s"}
	  // TODO: GET MERCHANT TICKET INFO
	  // PRINT RECIPT
	  // 
	  
     );
	}// payment success CB		
	}]);