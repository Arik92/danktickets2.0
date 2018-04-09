app.controller('ticketCtrl', ['purchaseService','$rootScope','$scope', '$window', '$stateParams', '$state', '$timeout', '$location',
	function (purchaseService,$rootScope, $scope) {
		// consider $state, $timeout for navigation after purchase
		this.$onInit = function() {								
			var config = require('../config.js');
            Payfields.config.apiKey = config.MERCHANT_PUBLIC_API_KEY;						
			purchaseService.getCart($rootScope.currentUser).then(function(result){
				if (result) {
				$scope.dankCart = result;				
				} else {
					$scope.dankCart = [];					
				}										
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
  };
	            PayFields.appendIframe();
                //console.log("errors?", Payfields.appendErrors());               
               $scope.showCheckout = false;
				getDankCartTotal();
			});						
		};//onInit 		
		$scope.remove = function (merchantIndex, ticketIndex) {
			console.log("tickets to be spliced", $scope.dankCart[merchantIndex].tickets);
			if($scope.dankCart[merchantIndex].tickets.length>0) {
			 $scope.dankCart[merchantIndex].tickets.splice(ticketIndex, 1);
             if ($scope.dankCart[merchantIndex].tickets.length===0){
				 $scope.dankCart.splice(merchantIndex, 1);
				 console.log("cart after merchant splice",$scope.dankCart);
			 }	//if that ticket cart is empty			 
			 purchaseService.saveCart($rootScope.currentUser, $scope.dankCart).then(function(result){
			     console.log("updated!, purchased", result);
				 getDankCartTotal();
			});			
			}
		};
		$scope.clear = function () {
			console.log("removing", $scope.dankCart);	
			$scope.dankCart = [];
			purchaseService.saveCart($rootScope.currentUser, $scope.dankCart).then(function(result){
				console.log("cleared");
				$scope.dankCartTotal = 0;
			});				
		};		
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
            //console.log("merchant is", merchant);
            $scope.purchasedTickets = merchant.tickets;	
			$scope.merchId = merchant.merchantId;
            console.log("purchased tickets ", $scope.purchasedTickets);						
			Payfields.reload();
			console.log("Payfields is", PayFields);                        			
			$scope.showCheckout = !$scope.showCheckout;	          		
			Payfields.config.merchant = merchant.merchantId;
			Payfields.config.amount = getMerchantSum(merchant.tickets);			
  };//checkout
		$scope.pay = function(){
			console.log("attempting payment");
			console.log("field contents?", Payfields);
			Payfields.submit();
		};//pay
	Payfields.onSuccess = function(response) {
     // We will flash success response on button and clear the iframe inputs     
      $("#button").text("Success");
      $("#button").css(
      {"backgroundColor": "rgb(79,138,16)", "transition": "2s"}
	  );	  
	   var individualTickets = [];
	  for (var i=0;i<$scope.purchasedTickets.length;i++) {
		  $scope.purchasedTickets[i].owner = $rootScope.currentUser;
		  $scope.purchasedTickets[i].merchantId = $scope.merchId;
		  $scope.purchasedTickets[i].checkedIn = false;
		  $scope.purchasedTickets[i].imgName = '';
		  for (var j=0;j<$scope.purchasedTickets[i].howMany;j++) {
			  individualTickets.push($scope.purchasedTickets[i]);
		     }//for 
		   }//for init imprinting// splitting to individual tickets		   
		 
	  purchaseService.addTickets(individualTickets).then(function(result){		 
		 console.log("ticket addition result", result); 
		 for (i=0;i<$scope.dankCart.length;i++) {
			 if ($scope.merchId===$scope.dankCart[i].merchantId) {
				 $scope.dankCart.splice(i, 1);
			 }// if splicing merchant after payment 
		 }// 
		 purchaseService.saveCart($rootScope.currentUser, $scope.dankCart).then(function(result){
			     //console.log("spliced the cart!");
				 getDankCartTotal();
				  $scope.showCheckout = false;
			});	
	  });	  
	  // PRINT RECIPT     
	};// payment success CB		
	}]);