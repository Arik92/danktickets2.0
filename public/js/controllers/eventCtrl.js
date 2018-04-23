app.controller('eventCtrl',['$scope' ,'$rootScope','$stateParams','createService', 'purchaseService', '$document','NgMap','angularLoad', '$timeout','$state','$location', function($scope,$rootScope, $stateParams, createService, purchaseService, $document, NgMap, angularLoad, $timeout, $state, $location){
	console.log("state param for event", $stateParams);	
	console.log("rootScope curren user is", $rootScope);
	this.$onInit = function() {
		//var socket = io(); //might move someplace else
		var config = require('../config.js');
		$scope.mapKey = config.MAPS_API_KEY;		
		var mapSrc = "https://maps.googleapis.com/maps/api/js?key=" + $scope.mapKey + "&libraries=places&language=en";
		//var imgSrc="https://maps.googleapis.com/maps/api/staticmap?center="+{{event.location.latlng}}+"&zoom=14&size=400x400&key=AIzaSyDaLn2AKXRJk06q8AUzN11XWQuuKlprlvM";
		//addScript(mapSrc);
		/*angularLoad.loadScript(mapSrc).then(function(result){
			initEvent();
		}); */			
		initEvent();
		showImage();
		$scope.ticketSum = 0;		
		$scope.socialLinks = linkService.socialLinks;
	//	initMap();		
		$scope.dummyEvents = createService.dummyEvents;	
		console.log($scope.dummyEvents);
		// setMapSrc();
	} //initialization  


	function initMap() {
	NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
	console.log("map is", map);
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });
	}

	function showImage() {
		console.log('removing class');
		$timeout(function() {
			document.querySelector('.poster-image').classList.remove('zero-opacity');
		}, 300);
	}
   
	function initEvent() {
	  createService.getEventById($stateParams.id).then(function(res, err){
		if (err) {
			console.log("error fetching specific event by id");
		} else {						
			$scope.event = res[0];					
			console.log("fetched event is", res[0]);
			var config = require('../config.js');			
			const staticMapKey = config.STATIC_MAPS_API_KEY;
			$scope.imgSrc="https://maps.googleapis.com/maps/api/staticmap?center="+$scope.event.location.latlng.lat+","+$scope.event.location.latlng.lng+"&zoom=13&size=1200x500&markers=color:red%7Clabel:C%7C"+$scope.event.location.latlng.lat+","+$scope.event.location.latlng.lng+"&key=AIzaSyDaLn2AKXRJk06q8AUzN11XWQuuKlprlvM";
			$scope.eventCart = {
				"organizer": $scope.event.organizer.name,
				"merchantId": $scope.event.organizer.merchantId,
				"tickets": []
			};			
			console.log("initial event cart ",$scope.eventCart);			
			for (var i=0;i<$scope.event.eventTickets.length;i++) {
				var cartObj = {
					'ticketName': $scope.event.eventTickets[i].ticketName,
					'ticketPrice': $scope.event.eventTickets[i].ticketPrice,					
					'howMany': 0,
					'title': $scope.event.title,
					'eventId': $scope.event._id,
					'eventTicketId': $scope.event.eventTickets[i]._id					
				}//ticketCart object
				$scope.eventCart.tickets.push(cartObj);
			}//for             			
			console.log("after loop", $scope.eventCart.tickets);
		}//else
	  });//getEventById
  }//initEvent	
  function addScript(src) {
    var tag = document.getElementById("maptag");
    if (!tag) {
      var s = document.createElement('script');
      s.setAttribute('src', src);
	  //s.setAttribute('defer','');
	  //s.setAttribute('async','');	  
      s.setAttribute('id', "maptag");
      document.body.appendChild(s);
      console.log("adding tag for first time in the run");
    } else {
      console.log("tag alredy added");     
    }//else
    // when the script has finished loading, only THEN call autocomplete()
  }//addScript

  //calling the addScript function
  
	/*function setMapSrc() {
		const config = require('../config');
		const staticMapKey = config.STATIC_MAPS_API_KEY;
		const mapImg = $document.getElementById('static-map-img');
		mapImg.src = "https://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=400x400&key=AIzaSyBlqLa-v1ZicvzAhvzPyX4p0mbXIzYjGEk" 
									+ staticMapKey;
	}*/
  
  /*$scope.addToCart = function(ticket, numTickets) {
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
  }//addToCart  - cart is for the user to mess with and make his order. this doest buy or reserve them yet! */
	
	/*$scope.cartPlus = function(index) {
	  console.log("ticket cart", $scope.eventCart.tickets);
	  $scope.eventCart.tickets[index].howMany++;
	  console.log("what is upp"+$scope.eventCart.tickets[index].howMany );
		if ($scope.eventCart.tickets[index].howMany<=$scope.eventCart.tickets[index].ticket.ticketQ) {
	  $scope.updateSum();
		} else {
		$scope.eventCart.tickets[index].howMany--;
	 }//else 
	}//cartplus
	
   $scope.cartMinus = function(index) {	 
   if ($scope.eventCart.tickets[index].quantity>0) {	
          $scope.eventCart.tickets[index].howMany--;   
	  	  $scope.updateSum();
	  }//else
	}//cartMinus */
	
	$scope.updateSum = function() {		
		//console.log("the shopping cart is ",$scope.eventCart.tickets);
		//console.log("the event tickets are ", $scope.event.eventTickets);
		for (var i=0;i<$scope.eventCart.tickets.length;i++) {
			if ($scope.eventCart.tickets[i].howMany===undefined) {
				alert("cannot add that many tickets");
				$scope.eventCart.tickets[i].howMany = $scope.event.eventTickets[i].ticketQ;				
			}//if cannot purchase that many 
		}//for 		
			$scope.ticketSum = 0;
			for (i=0;i<$scope.eventCart.tickets.length;i++) {				
				if ($scope.eventCart.tickets[i].howMany>0) {
				$scope.ticketSum+= $scope.eventCart.tickets[i].ticketPrice*$scope.eventCart.tickets[i].howMany;
				}//if ticket sum is greater than 0 somehow(user bruteforcing negative value
			}//for 		
			console.log("the new sum is ", $scope.ticketSum);
	} //update sum to update any changes made to ticket quantities

	$scope.removeFromCart = function(index) {
	 $scope.eventCart.tickets.splice(index, 1);
	 $scope.updateSum();
	}//remove from cart
	
  $scope.checkout = function() {
	  console.log("final checkout",$scope.eventCart.tickets);
	  for (var i=0;i<$scope.eventCart.tickets.length;i++) {
		  if ($scope.eventCart.tickets[i].howMany<=0) {
			  $scope.eventCart.tickets.splice(i,1);
		  }//if
	  }//for cleaning out empty entries	 
	   console.log("current user when getting that cart", $rootScope.currentUser);
	  purchaseService.getCart($rootScope.currentUser).then(function(result){
		 
                var organizerFlag = false;		  
				console.log("event cart is", $scope.eventCart);
				if (result) {				
                for (var i=0;i<result.length;i++) {		                    			
					if (result[i].organizer.localeCompare($scope.eventCart.organizer)===0) {						
						for (var j=0;j<$scope.eventCart.tickets.length;j++) {
							result[i].tickets.push($scope.eventCart.tickets[j]);		
                            organizerFlag = true;							
						}//for filling existing org ticets with newer ones
					}//if organizer is already on the cart 
				}//for 				
				 if (!organizerFlag) {
					 result.push($scope.eventCart);
				 }
				purchaseService.saveCart($rootScope.currentUser, result).then(function(result2){
		        //console.log("ive saved cart for ", $rootScope.currentUser);
				$timeout(function () {
                 $location.path('/cart');
                }, 2000);
			  });		
				} 
				else {
				  var finalCart = [];
                  finalCart.push($scope.eventCart);
	              purchaseService.saveCart($rootScope.currentUser, finalCart).then(function(result2){
		          //console.log("ive saved cart for ", $rootScope.currentUser);
				  $timeout(function () {
                   $location.path('/cart');
                  }, 2000);
			    });						 
			   }								
			});		 
	//TODO: check that the event has said number of tickets available. if it does, connect to socket and reserve tickets
	// have a request to update the db about and reserve said tickets 
	//
  }// this is where the server requests are sent
  
}]);
