app.controller('searchCtrl', ['$scope', '$window', 'createService', '$stateParams', function ($scope, $window, createService, $stateParams) {

	function filter() {
		var patt = new RegExp($stateParams.string, 'i');
		$scope.organizerEvents = [];
		$scope.titleEvents = [];
		$scope.descriptionEvents = [];
		for (var i = 0; i < $scope.events.length; i++) {
			setCheapestTicket($scope.events[i]);
			if (patt.test($scope.events[i].title)) {
				$scope.titleEvents.push($scope.events[i]);
			} else if (patt.test($scope.events[i].organizer.name)) {
				$scope.organizerEvents.push($scope.events[i]);
			} else {
				$scope.descriptionEvents.push($scope.events[i]);
			}//else 
		}//for 
		if ($scope.nearbyEvents === []) {
			$scope.nearbyEvents = undefined;
		}
		console.log("by title ", $scope.titleEvents);
		console.log("by org ", $scope.organizerEvents);
		console.log("by description ", $scope.descriptionEvents);
	}//filter

	$scope.useOwnLocation = function () {
		$scope.nearbyEvents = [];
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (success) {
				console.log("success", success);
				$scope.selectedLat = success.coords.latitude;
				$scope.selectedLng = success.coords.longitude;
				$scope.timeStamp = success.timestamp / 1000;
				for (var i = 0; i < $scope.events.length; i++) {
					$scope.events[i].distance = $scope.getDistanceFromLatLonInMiles($scope.events[i].location.latlng.lat, $scope.events[i].location.latlng.lng, $scope.selectedLat, $scope.selectedLng);
					$scope.events[i].distance = Math.round($scope.events[i].distance * 100) / 100;
					console.log("distance is", $scope.events[i].distance);
					if ($scope.events[i].distance <= 50) {
						$scope.nearbyEvents.push($scope.events[i]);
					}
				}//for 	
				if ($scope.nearbyEvents[0] === undefined) {
					console.log("empty nearby");
					$scope.nearbyEvents = undefined;
				}
				$scope.$apply();
			});//navigator cb  
		} else {
			alert("this browser does not support location services");
		}//else 
	}//useOwnLocation

	$scope.getDistanceFromLatLonInMiles = function (lat1, lon1, lat2, lon2) {
		console.log("comparing" + lat1 + " and " + lon1 + " and " + lat2 + " lon 2: " + lon2);
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2 - lat1); // deg2rad below
		var dLon = deg2rad(lon2 - lon1);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = (R * c) * 0.621371; // Distance in miles: 1km= 0.621371 miles
		return d;
	}

	function deg2rad(deg) {
		return deg * (Math.PI / 180)
	}
	function setCheapestTicket(currEvent) {
		console.log(currEvent);
		var min = currEvent.eventTickets[0].ticketPrice;
		for (var i = 0; i < currEvent.eventTickets.length; i++) {
			if ((currEvent.eventTickets[i].ticketPrice < min) && (currEvent.eventTickets[i].ticketQ > 0)) {
				min = currEvent.eventTickets[i].ticketPrice;
			}//if found a new Minimum
		}//for 
		currEvent.minTicketPrice = min;
	}//set cheapest ticket price (part of filter function)
	$scope.defaultFilter = function () {
		$scope.relevanceFlag = true;
		$scope.priceFlag = false;
		$scope.dateFlag = false;
		$scope.locationFlag = false;
	}//defaultFilter
	$scope.priceFilter = function () {
		$scope.relevanceFlag = false;
		$scope.priceFlag = true;
		$scope.dateFlag = false;
		$scope.locationFlag = false;
	}//defaultFilter
	$scope.dateFilter = function () {
		$scope.relevanceFlag = false;
		$scope.priceFlag = false;
		$scope.dateFlag = true;
		$scope.locationFlag = false;
	}//defaultFilter
	$scope.locationFilter = function() {
		$scope.locationEvents = [];
		var locationPatt = new RegExp($scope.locationString, 'i');		
		for (var i=0;i<$scope.events.length;i++) {			
			if ((locationPatt.test($scope.events[i].location.venue_name))||(locationPatt.test($scope.events[i].location.city))) {
				$scope.locationEvents.push($scope.events[i]);
			}//if location match
		}//for 		
		$scope.relevanceFlag = false;
		$scope.priceFlag = false;
		$scope.dateFlag = false;
		$scope.locationFlag = true;
	}//reSearch 
	this.$onInit = () => {
		$scope.defaultFilter();
		/*$scope.relevanceFlag = true;
		$scope.priceFlag = false;
		$scope.dateFlag = false;*/
		//console.log("searching for", $stateParams.string);
		$scope.searchString = $stateParams.string;
		//$scope.dummyEvents = createService.dummyEvents;	
		//console.log($scope.dummyEvents);
		createService.generalSearch($stateParams.string).then(function (result) {
			//console.log("search result", result);
			$scope.events = result;
			$scope.useOwnLocation();
			filter();
		});// CB
	}//onInit

	//// ===================== filter types ===========================
	$scope.filterTypes = [
		{
			title: 'event type',
			isOpen: false,
			filters: ['all', 'convention', 'meeting', 'concert']
		},
		{
			title: 'date',
			isOpen: false,
			filters: ['all', 'today', 'tomorrow', 'this week', 'this weekend', 'next week', 'next month', 'custom date']
		},
		{
			title: 'price',
			isOpen: false,
			filters: ['all', 'paid', 'free']
		}
	];

	$scope.flipIcon = (index) => {
		$scope.filterTypes[index].isOpen = !$scope.filterTypes[index].isOpen; 
	}
	
}]);