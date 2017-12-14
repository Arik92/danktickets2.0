app.controller('homeCtrl', ['createService', 'dankAdService', '$rootScope', '$scope', '$http', '$window', '$location', function (createService, dankAdService, $rootScope, $scope, $http, $window, $location) {

  this.$onInit = () => {
    console.log("hello from hoe ctrl");
    homeEventsPrep();
    $scope.dummyEvents = getDummyEvents();
    $scope.dummyAds = dankAdService.dummyAds;
    console.log($scope.dummyAds);
    $scope.featuredDummyEvent =  {
      imgURL: "../../img/wide-posters/cannabis-cup.png",
      name: 'Cannabis Cup',
      date: 'Friday, January 26, 7:00 PM',
      location: 'Sherman Oaks, CA'
    }
    console.log($scope.events);
	$scope.upcomingFlag = true;
	$scope.localFlag = false;	
  }
  $scope.goLocal = function() {	
	 $scope.upcomingFlag = false;
	 $scope.localFlag = true;	
	 $scope.useOwnLocation();	 
  }//golocal
   $scope.goUpcoming = function() {
	$scope.upcomingFlag = true;
	$scope.localFlag = false;	
  }//golocal
    /////////////////////////////////////////////////////location interface //////////////////////////////////////////////////
$scope.useOwnLocation = function() {
	if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(success){
    console.log("success", success);
    $scope.selectedLat = success.coords.latitude;
    $scope.selectedLng = success.coords.longitude;
    $scope.timeStamp = success.timestamp/1000; 
	for (var i=0;i<$scope.events.length;i++) {
	  $scope.events[i].distance = $scope.getDistanceFromLatLonInMiles($scope.events[i].location.latlng.lat, $scope.events[i].location.latlng.lng, $scope.selectedLat, $scope.selectedLng);
	  $scope.events[i].distance = Math.round($scope.events[i].distance*100)/100;
	  console.log("distance is",$scope.events[i].distance);	  
	}//for 		
	$scope.$apply();
  });//navigator cb  
	} else {
		alert("this browser does not support location services");
	}//else 
}//useOwnLocation

$scope.getDistanceFromLatLonInMiles = function(lat1, lon1, lat2, lon2) {
	console.log("comparing"+lat1+" and "+lon1+" and "+lat2+" lon 2: "+lon2);
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = (R * c)* 0.621371; // Distance in miles: 1km= 0.621371 miles
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }
  /////////////////////////////////////////////////////location interface //////////////////////////////////////////////////
  
  $scope.isActive = function (route) {
    return route === $location.path();
  }

  function homeEventsPrep() {
    createService.getEvents().then(function (result) {
      console.log("All events: ", result);
      $scope.events = result;	  
    }, function (err) {
      throw (err)
    })//GET request route
  }

  $scope.logout = function () {
    console.log("logging out...");
    localStorage.removeItem("user");
    $rootScope.currentUser = null;
    delete $http.defaults.headers.common.Authorization;
  }

  function getDummyEvents() {
    let events = [];
    for (i=0; i<15; i++) {
      events.push({
        name: 'dummy event',
        date: '4/20/2018',
        location: 'Calabasas, NM'
      })
    }
    return events;
  }

}]);
