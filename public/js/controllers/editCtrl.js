app.controller('editCtrl',['createService','orService', 'userService', '$scope' ,'$window','$stateParams','$timeout','$location','$rootScope', function(createService, orService, userService, $scope, $window, $stateParams, $timeout, $location, $rootScope){
  //$scope.video = $stateParams.videoParam;
  console.log("state params", $stateParams);
  //$scope.selectedName = $stateParams.eventParam.organizer.name;
  //console.log("selected name", $scope.selectedName);
  function initEventAndProfs() {
	  createService.getEventById($stateParams.id).then(function(res, err){
		if (err) {
			console.log("error fetching specific event by id");
		} else {
			console.log("fetched event is", res[0]);
			$scope.currentTickets = [];
			$scope.event = res[0];			
            $scope.profiles = [];
			$scope.eventTicketSum = 0;
	        $scope.currentTicketSum = 0;
    //console.log("initial profs for ",$rootScope.currentUser);    
      orService.getOrganizersByUser($rootScope.currentUser).then(function(data2){
        //console.log("data 2", data2);
        $scope.profiles = data2;
		$scope.selectedName = $scope.event.organizer.name;
		initStartDatePicker();
		initEndDatePicker();
      })//get organizers  
		}//else
	  });//getEventById
  }//initProfs
  
  this.$onInit = function() {
			console.log('init fired');
			initEventAndProfs();			
			addScript(mapSrc); 		
	}//onInit	  
	//////////////////////////////////////// TICKET INTERFACE ////////////////////////////////////////////
	$scope.deleteEventTicket = function(index) {
		createService.deleteEventTicket($scope.eventTickets[index]._id).then(function(result){
			console.log("ticket deletion successful", result);
			$scope.event.eventTickets.splice(index, 1);
			$scope.updateQ();
		})//cb
	}//deleteCurrentTick
	$scope.updateEventTicket = function(ticket) {
		createService.updateEventTicket(ticket).then(function(result){
			console.log("ticket update successful", result);	
            $scope.updateQ();			
		})//cb
	}//deleteCurrentTick
	$scope.deleteCurrentTicket = function(index) {    
	$scope.currentTickets.splice(index, 1);// $scope.event.numTickets - 
	$scope.updateQ();
  }  
   $scope.add = function (type) {
    var isFree = false;
    if (type === 'Free') {
      isFree = true;
    }
    var ticket = {
      ticketType: type,
      ticketPrice: 0,
      ticketName: type + " Ticket",
      ticketQ: 0,
      isFree: isFree
    }
    console.log("added ticket is ", ticket);
    $scope.currentTickets.push(ticket);  
    $scope.updateQ();	
  }// adding additional ticket
  
   $scope.updateQ = function () {
	  $scope.eventTicketSum = 0;
	  $scope.currentTicketSum = 0;
    for (var i=0;i<$scope.event.eventTickets.length;i++) {
		$scope.eventTicketSum+=$scope.event.eventTickets[i].ticketQ;
	}//for event ticket loop
	 for (i=0;i<$scope.currentTickets.length;i++) {
		$scope.currentTicketSum+=$scope.currentTickets[i].ticketQ;
	}//for event ticket loop
  }//updateQ - updates both sums for the display of event and currentTicks
  
	//////////////////////////////////////// TICKET INTERFACE ////////////////////////////////////////////
  
 
  
  $scope.selectProf = function(){
    console.log("selected profile is", $scope.selectedName);
	$scope.event.organizer = $scope.selectedName;
	console.log("organizer assigned", $scope.event.organizer);
	console.log("scope event", $scope.event);
  }
  $scope.typeOptions = [
    'Concert',
    'Meeting',
    'Convention',
    'Party',
    'Other'
  ];
        ////////////////////file upload /////////////////////////////////////////////////////////////
        $scope.showPrivates = function() {
          alert($scope.isPrivate);
        }
       $scope.compareDates = function() {
         var diff = $scope.endDate.getTime()- $scope.startDate.getTime();
         if (diff>0) {
           console.log("end date is bigger than start")
         } else if (diff<0) {
           console.log("invalid date!!!");
         } else {
           console.log("same day");
         }//else
       }//compareDates
   $scope.initUploader = function() {
	  cloudinary.openUploadWidget({ cloud_name: 'newoldroad-com',
	  upload_preset: 'organizer_pgznub8n',
	  theme: 'purple',
	  multiple: false,
	  cropping_show_back_button: true,
	  cropping: 'server',
	  cropping_coordinates_mode:'custom',
	  sources: ['local', 'url', 'facebook', 'instagram', 'dropbox']
	  }, 
      function(error, result) { 
	  console.log(result);
	  // for HTTPS $scope.previewImg = result.secure_url;
	  $scope.previewImg = result[0].url;
      $scope.$apply();	  
	  });
  }//initUploader
  
        $scope.submit = function(){ //function to call on form submit
              //TODO: check if from is valid
              //TODO: Now I check if the image file has been changed.            
                console.log("added event would be", $scope.event);
				console.log(" and tickets ", $scope.currentTickets);
                createService.updateEvent($scope.event, $scope.currentTickets).then(function(res){
                  console.log("update event successfully!");
                  $scope.showRedirect = true;
                  $timeout(function() {
                    $location.path('/');
                  }, 2000);
                }, function(err){
                  console.log("controller error promise");
                  console.error(err);
                });
             
        }//sumbit

  //////////////////////file upload /////////////////////////////////////////////////////////////

  var config = require('../config.js');
  $scope.mapKey = config.MAPS_API_KEY;
  //console.log("key is: ", $scope.mapKey);  
  /////////////////////////////////////////// Map interface /////////////////////////////////////////////////////////
  var placeSearch, autocomplete;
function initAutocomplete(){
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */
    (document.getElementById('autocomplete')), {
      types: ['establishment']
    });
  console.log('autocomplete is', autocomplete)
  // console.log('autocomplete', autocomplete);
  autocomplete.addListener('place_changed', fillInAddress);
}
function formatLocation() {
	  $scope.location = {};
	  $scope.location.venue_name = $scope.selectedPlace.name;
	  $scope.location.fullAddress = $scope.formatted_address;
	  $scope.location.locationMapUrl = $scope.selectedPlace.url;
	  $scope.location.latlng = {
        lat: $scope.selectedLat,
        lng: $scope.selectedLng
      };
	  for (var i=0;i<$scope.selectedPlace.address_components.length;i++) {
		  switch ($scope.selectedPlace.address_components[i].types[0]) {
			  case 'postal_code':
				$scope.location.zip = $scope.selectedPlace.address_components[i].long_name;
				break;
			  case 'country':
				$scope.location.country = $scope.selectedPlace.address_components[i].long_name;
				break;
			  case 'administrative_area_level_1':
				$scope.location.address2 = $scope.selectedPlace.address_components[i].long_name;
			    break;
				case 'locality':
				$scope.location.city = $scope.selectedPlace.address_components[i].long_name;
			    break;				
			  default: break;//??
		  }//switch address components 		 
	  }//for	  
	  console.log("latlng",$scope.location.latlng);
	  const staticMapKey = config.STATIC_MAPS_API_KEY;
			$scope.imgSrc="https://maps.googleapis.com/maps/api/staticmap?center="+$scope.location.latlng.lat+","+$scope.location.latlng.lng+"&zoom=13&size=1200x500&markers=color:red%7Clabel:C%7C"+$scope.location.latlng.lat+","+$scope.location.latlng.lng+"&key=AIzaSyDaLn2AKXRJk06q8AUzN11XWQuuKlprlvM";
				$scope.ShowLocationPreview = true;
	  $scope.$apply();
  }
function fillInAddress() {
  // Get the place details from the autocomplete object.
  $scope.selectedPlace = autocomplete.getPlace();
  console.log('place is', $scope.selectedPlace);
  console.log('place lat is', $scope.selectedPlace.geometry.location.lat());
  console.log('place langtitude is', $scope.selectedPlace.geometry.location.lng());
  $scope.selectedLat = $scope.selectedPlace.geometry.location.lat(); // NOTE: setting current lattitude/longitude for distance calculation
  $scope.selectedLng = $scope.selectedPlace.geometry.location.lng();
  formatLocation();
} //fillInAdress

$scope.getDistanceFromLatLonInKm = function(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

function addScript( src ) {
  var tag = document.getElementById("maptag");
	console.log("tag is", tag);
    if (!tag)  {
    var s = document.createElement( 'script' );
    s.setAttribute( 'src', src );
    s.setAttribute('id', "maptag");
    document.body.appendChild( s );
    console.log("adding tag for first time in the run");
    s.onload = initAutocomplete;
  } else {
    console.log("tag alredy added");
    initAutocomplete();
  }//else
    // when the script has finished loading, only THEN call autocomplete()
}//addScript

  //calling the addScript function
  var mapSrc = "https://maps.googleapis.com/maps/api/js?key="+$scope.mapKey+"&libraries=places&language=en";
  //from create 
  //var mapSrc = "https://maps.googleapis.com/maps/api/js?key=" + $scope.mapKey + "&libraries=places&language=en";  

/////////////////////////////////////////// Map interface /////////////////////////////////////////////////////////
  //////////////////////////////////// initializing pickers ////////////////////////////////////////////
  var initStartDatePicker = function(){
  var startDatepicker = datepicker('#edit_start_date_picker', {
  position: 'br', // Top right.
  startDate: new Date($scope.event.startTime), // This month.
  dateSelected: new Date($scope.event.startTime), // Today is selected.
  minDate: new Date($scope.event.startTime), // June 1st, 2016.
  maxDate: new Date(2099, 0, 1), // Jan 1st, 2099. //TODO: expand this dynamicly? maybe
  noWeekends: false,
  formatter: function(el, date) {
    // This will display the date as `1/1/2017`.
    el.value = date.toDateString();
  },
  onSelect: function(instance) {
    // Show which date was selected.
    $scope.event.startDate = instance.dateSelected.getTime();
	$scope.event.startDateDisplay = instance.dateSelected.toDateString();
    //$scope.event.startDate = instance.dateSelected.toDateString();
    console.log("NEW start date is ", $scope.event.startDate);
  },
  onShow: function(instance) {
    console.log('Calendar showing.');
  },
  onHide: function(instance) {
    console.log('Calendar hidden.');
  },
  onMonthChange: function(instance) {
    // Show the month of the selected date.
    console.log(instance.currentMonthName);
  },
  customMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
  overlayPlaceholder: 'Enter a 4-digit year',
  overlayButton: 'Go!',
  disableMobile: true // Conditionally disabled on mobile devices.
});
  }//init stattDatePicker
  var initEndDatePicker = function(){
var endDatepicker = datepicker('#edit_end_date_picker', {
position: 'br', // Top right.
startDate: new Date(), // This month.
dateSelected: new Date($scope.event.endTime), // Today is selected.
minDate: new Date($scope.event.endTime), // June 1st, 2016.
maxDate: new Date(2099, 0, 1), // Jan 1st, 2099. //TODO: expand this dynamicly? maybe
noWeekends: false,
formatter: function(el, date) {
  // This will display the date as `1/1/2017`.
  el.value = date.toDateString();
},
onSelect: function(instance) {
  // Show which date was selected.
  console.log("End date: ", instance.dateSelected);
  $scope.event.endDate = instance.dateSelected.getTime();
  $scope.event.endDateDisplay = instance.dateSelected.toDateString();
  console.log("NEW end date is "+ $scope.event.endDate+" displayed:"+$scope.event.endDateDisplay);
},
onShow: function(instance) {
  console.log('Calendar showing.');
},
onHide: function(instance) {
  console.log('Calendar hidden.');
},
onMonthChange: function(instance) {
  // Show the month of the selected date.
  console.log(instance.currentMonthName);
},
customMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
overlayPlaceholder: 'Enter a 4-digit year',
overlayButton: 'Go!',
disableMobile: true // Conditionally disabled on mobile devices.
});
  }//initEndDatePicker
$scope.startHrCalender = [
  '',
  '12:00 AM',
  '12:30 AM',
  '01:00 AM',
  '01:30 AM',
  '02:00 AM',
  '02:30 AM',
  '03:00 AM',
  '03:30 AM',
  '04:00 AM',
  '04:30 AM',
  '05:00 AM',
  '05:30 AM',
  '06:00 AM',
  '06:30 AM',
  '07:00 AM',
  '07:30 AM',
  '08:00 AM',
  '08:30 AM',
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 AM',
  '12:30 AM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
  '06:00 PM',
  '06:30 PM',
  '07:00 PM',
  '07:30 PM',
  '08:00 PM',
  '08:30 PM',
  '09:00 PM',
  '09:30 PM',
  '10:00 PM',
  '10:30 PM',
  '11:00 PM',
  '11:30 PM',
];
// $scope.startHr = $scope.startHrCalender[0];
$scope.endHrCalender = [
  '',
  '12:00 AM',
  '12:30 AM',
  '01:00 AM',
  '01:30 AM',
  '02:00 AM',
  '02:30 AM',
  '03:00 AM',
  '03:30 AM',
  '04:00 AM',
  '04:30 AM',
  '05:00 AM',
  '05:30 AM',
  '06:00 AM',
  '06:30 AM',
  '07:00 AM',
  '07:30 AM',
  '08:00 AM',
  '08:30 AM',
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 AM',
  '12:30 AM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
  '06:00 PM',
  '06:30 PM',
  '07:00 PM',
  '07:30 PM',
  '08:00 PM',
  '08:30 PM',
  '09:00 PM',
  '09:30 PM',
  '10:00 PM',
  '10:30 PM',
  '11:00 PM',
  '11:30 PM',
];
$scope.endHr = $scope.endHrCalender[0];
$scope.updateEndHr = function() {
  console.log("start hour is", $scope.startHr);
};
  //init calenders and hour pickers
  $scope.deleteEvent = function() {
	  createService.deleteEvent($scope.event._id).then(function(result){
		  console.log("delete result is", result);
		  $timeout(function() {
                    $location.path('/');
                  }, 2000);
	  })
  }
}]);
