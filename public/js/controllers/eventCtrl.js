app.controller('eventCtrl',['$scope' ,'$rootScope','$stateParams','createService', '$document','NgMap','angularLoad', function($scope,$rootScope, $stateParams, createService, $document, NgMap, angularLoad){
	console.log("state param for event", $stateParams);	
	this.$onInit = () => {
		var socket = io(); //might move someplace else
		var config = require('../config.js');
		$scope.mapKey = config.MAPS_API_KEY;		
		var mapSrc = "https://maps.googleapis.com/maps/api/js?key=" + $scope.mapKey + "&libraries=places&language=en";
		//var imgSrc="https://maps.googleapis.com/maps/api/staticmap?center="+{{event.location.latlng}}+"&zoom=14&size=400x400&key=AIzaSyDaLn2AKXRJk06q8AUzN11XWQuuKlprlvM";
		//addScript(mapSrc);
		/*angularLoad.loadScript(mapSrc).then(function(result){
			initEvent();
		}); */
		initEvent();
		$scope.ticketCart = [];
		$scope.ticketSum = 0;
		$scope.ticketsToAdd = 0;
		$scope.socialLinks = linkService.socialLinks;
	//	initMap();		
		//$scope.dummyEvents = createService.dummyEvents;	

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
  
  $scope.addToCart = function(ticket, numTickets) {
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
  }//addToCart  - cart is for the user to mess with and make his order. this doest buy or reserve them yet!
	
	$scope.cartPlus = function(index) {
	  $scope.ticketCart[index].quantity++;
  if ($scope.ticketCart[index].quantity<=$scope.ticketCart[index].ticket.ticketQ) {
	  $scope.updateSum();
	} else {
		$scope.ticketCart[index].quantity--;
	}//else 
	}//cartplus
	
   $scope.cartMinus = function(index) {
	  $scope.ticketCart[index].quantity--;
	  if ($scope.ticketCart[index].quantity===0) {
		  $scope.removeFromCart(index);
	  } else {
	  	  $scope.updateSum();
	  }//else
	}//cartMinus
	
	$scope.updateSum = function() {
		$scope.ticketSum = 0;
		for (var i=0;i<$scope.ticketCart.length;i++) {
			$scope.ticketSum+= $scope.ticketCart[i].ticket.ticketPrice*$scope.ticketCart[i].quantity;
		}//for 
	} //update sum to update any changes made to ticket quantities

	$scope.removeFromCart = function(index) {
		//$scope.ticketSum-=$scope.ticketCart[index].ticketPrice*$scope.ticketCart[index].ticketQ; feels DRY
	 $scope.ticketCart.splice(index, 1);
	 $scope.updateSum();
	}//rrmove from cart
  $scope.checkout = function() {
	  console.log("final checkout",$scope.ticketCart);
	//TODO: check that the event has said number of tickets available. if it does, connect to socket and reserve tickets
	// have a request to update the db about and reserve said tickets 
	//
  }// this is where the server requests are sent
  
}]);
