(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var config = {
  MAPS_API_KEY: 'AIzaSyBlqLa-v1ZicvzAhvzPyX4p0mbXIzYjGEk',
  STATIC_MAPS_API_KEY: 'AIzaSyDaLn2AKXRJk06q8AUzN11XWQuuKlprlvM',
  MERCHANT_PUBLIC_API_KEY: 'ab5e7c1e7486577a183541f1edad0875',
  MERCHANT_PRIVATE_API_KEY: 'bd4e68a283fedaa98e31d9be42472108',
  MERCHANT_MCC: '8111'
};
module.exports = config;
},{}],2:[function(require,module,exports){
app.controller('createCtrl', ['createService', 'orService', 'userService', '$scope', '$window', '$timeout', '$rootScope', '$location', 'angularLoad', function (createService, orService, userService, $scope, $window, $timeout, $rootScope, $location, angularLoad) {
  console.log('hello from createCtrl');
  this.$onInit = function() {
	$scope.currentTickets = [];	
	$scope.startHr = $scope.startHrCalender[0];
	$scope.endHr = $scope.endHrCalender[0];
    initProfs();	
    initEndDatePicker();
    initStartDatePicker();
	$scope.ShowLocationPreview = false;
  }    
////////////////////////////////////////////////ticket interface//////////////////////////////////////  

  $scope.deleteTempTick = function(index) {
    $scope.currentTickets.splice(index, 1);
	$scope.updateQ();
  }
  
  $scope.resetTickets = function() {
    $scope.currentsTickets = [];
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
      free: isFree,
	  ticketsSold: 1 //for mockup reasons
    }
    console.log("added ticket is ", ticket);
    $scope.currentTickets.push(ticket);
	$scope.updateQ();
    
  }
  
  $scope.updateQ = function () {
    $scope.totalTickets = 0;
    for (var i = 0; i < $scope.currentTickets.length; i++) {
      $scope.totalTickets += $scope.currentTickets[i].ticketQ;
    }//for
  }//updateQ
  
  $scope.typeOptions = [
    'Concert',
    'Meeting',
    'Convention',
    'Party',
    'Other'
  ];

  function initProfs() {
	  $scope.profiles = [];
   orService.getOrganizersByUser($rootScope.currentUser).then(function (result) {
      console.log("All profiles by ", $rootScope.currentUser, result);
      $scope.profiles = result;
      $scope.selectedOrganizer = result[0];
    }, function (err) {
      throw (err)
    })//GET request route 
  }//initProfs //NOTE we need the user fetching here to get that owner id
  // initProfs();
  $scope.selectProf = function () {
	  $scope.pleaseSelectOrg = false;	
    console.log("selected profile is", $scope.selectedOrganizer);
  }
  //////////////////////////////////// initializing pickers ////////////////////////////////////////////
  //TODO: when loading an event, set the start/end dates accordingly

  function initStartDatePicker() {
	  var initialStart = new Date();
	  $scope.startDate = initialStart.getTime();
	  $scope.startDateDisplay = initialStart.toDateString();
    var startDatepicker = datepicker('#create_start_date_picker', {
      position: 'br', // Top right.
      startDate: new Date(), // This month.
      dateSelected: new Date(), // Today is selected.
      minDate: new Date(), // June 1st, 2016.
      maxDate: new Date(2099, 0, 1), // Jan 1st, 2099. //TODO: expand this dynamicly? maybe
      noWeekends: false,
      formatter: function (el, date) {
        // This will display the date as `1/1/2017`.
        el.value = date.toDateString();
      },
      onSelect: function (instance) {
        // Show which date was selected.
        console.log("start date: ", instance.dateSelected);
        $scope.startDate = instance.dateSelected.getTime();
		$scope.startDateDisplay = instance.dateSelected.toDateString();
        //console.log("as string?", $scope.startDate);
		/*var num = instance.dateSelected.getTime();
		console.log("as number: "+num+"and it is a"+typeof(num));
		var date2 = new Date(num);
		console.log("date 2", date2);
		console.log(date2+" re converted "+ date2.toDateString()+"and as time"+date2.getTime());*/
      },
      onShow: function (instance) {
        console.log('Calendar showing.');
      },
      onHide: function (instance) {
        console.log('Calendar hidden.');
      },
      onMonthChange: function (instance) {
        // Show the month of the selected date.
        console.log(instance.currentMonthName);
      },
      customMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
      overlayPlaceholder: 'Enter a 4-digit year',
      overlayButton: 'Go!',
      disableMobile: false // Conditionally disabled on mobile devices.
    });
  }

  function initEndDatePicker() {
	  var initialEnd = new Date();
	  $scope.endDate = initialEnd.getTime();
	  $scope.endtDateDisplay = initialEnd.toDateString();
    console.log('initEndfired');
    var endDatepicker = datepicker('#create_end_date_picker', {
      position: 'br', // Top right.
      startDate: new Date(), // This month.
      dateSelected: new Date(), // Today is selected.
      minDate: new Date(), // June 1st, 2016.
      maxDate: new Date(2099, 0, 1), // Jan 1st, 2099. //TODO: expand this dynamicly? maybe
      noWeekends: false,
      formatter: function (el, date) {
        // This will display the date as `1/1/2017`.
        el.value = date.toDateString();
        // $scope.exampleDate = date;
      },
      onSelect: function (instance) {
        // Show which date was selected.
        console.log("End date: ", instance.dateSelected);
        $scope.endDate = instance.dateSelected.getTime();
	    $scope.endDateDisplay = instance.dateSelected.toDateString();
        console.log("as number", $scope.endDate);
        //console.log("exp date", $scope.exampleDate);
      },
      onShow: function (instance) {
        console.log('Calendar showing.');
      },
      onHide: function (instance) {
        console.log('Calendar hidden.');
      },
      onMonthChange: function (instance) {
        // Show the month of the selected date.
        console.log(instance.currentMonthName);
      },
      customMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
      overlayPlaceholder: 'Enter a 4-digit year',
      overlayButton: 'Go!',
      disableMobile: false // Conditionally disabled on mobile devices.
    });
  }

  $scope.startHrCalender = [   
    '12:00 AM',
    '12:30 AM',
    '01:00 AM',
    '01:30 AM',
    '02:00 AM',
    '02:30 AM',
    '03:00 AM',
    '03:30 AM',
    '04:00 AM',
    '04:20 AM',
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
    '04:20 PM',
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
    '12:00 AM',
    '12:30 AM',
    '01:00 AM',
    '01:30 AM',
    '02:00 AM',
    '02:30 AM',
    '03:00 AM',
    '03:30 AM',
    '04:00 AM',
    '04:20 AM',
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
    '04:20 PM',
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
  $scope.updateEndHr = function () {
    //console.log("start hour is", $scope.startHr);
    $scope.endHr = $scope.startHr;
  };
  ////////////////////file upload /////////////////////////////////////////////////////////////
  $scope.showPrivates = function () {
    alert($scope.isPrivate);
  }
  $scope.compareDates = function () {
    var diff = $scope.endDate - $scope.startDate;
	console.log("the dirf is "+diff);
    if (diff >= -20) {
      return true;
    } else {
      return false;
    }        //else
  }//compareDates

  function validator() {
    var validatorError = "ok";
	console.log("comapre dates ", $scope.compareDates());
    if ($scope.compareDates() === false) {
      validatorError = "Invaid Event dates! Make sure the event dates are valid";
    } else if ($scope.eName==null) {
	  validatorError = "Please enter an event name!";
	} else if ($scope.selectedOrganizer==null) {
	  validatorError = "Please select an organizer!";
	} else if ($scope.selectedType==null) {
	  validatorError = "Please select an event type!";
	} else if ($scope.location==null) {
	  validatorError = "Please select event's location(at least a venue/locatlity is required)!";
	}
    return validatorError;
  }//validator
  
	$scope.initUploader = function() {
	  cloudinary.openUploadWidget({ cloud_name: 'newoldroad-com',
	  upload_preset: 'events_single_oan5e5w1',
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
  $scope.upload = function () {     
    var evt = {
	  version: 1,
      title: $scope.eName,
      owner: $rootScope.currentUser,
      organizer: $scope.selectedOrganizer,
      type: $scope.selectedType,
      location: $scope.location,      
      startTime: $scope.startDate,
	  startDateDisplay: $scope.startDateDisplay,
      startHr: $scope.startHr,
      endTime: $scope.endDate,
	  endDateDisplay: $scope.endDateDisplay,
      endHr: $scope.endHr,
      description: $scope.eDesc,
      numTickets: $scope.totalTickets, //tickets remaining
      isPrivate: $scope.isPrivate,
      showRemainingTicks: $scope.showRemain,
	  image: $scope.previewImg,
	  ongoing: true
    };// event post object
    evt.eventTickets = [];
    for (var i = 0; i < $scope.currentTickets.length; i++) {
      evt.eventTickets.push($scope.currentTickets[i]);
    }// for filling ticket array
    var isLegit = validator();
    if (isLegit.localeCompare("ok") === 0) {
      //console.log("compared " + isLegit + " and ok. and the result is" + isLegit.localeCompare("ok"));      
        createService.postEvent(evt).then(function (resp) {
          console.log("Event added successfully through service!")
		  $scope.showRedirect = true;
            $timeout(function () {
              $location.path('/');
            }, 500);
        })
    
    }
    else {
      alert(isLegit);
    }
  };//scope.upload

  //////////////////////file upload /////////////////////////////////////////////////////////////

  var config = require('../config.js');
  $scope.mapKey = config.MAPS_API_KEY;
  //console.log("key is: ", $scope.mapKey);  
  /////////////////////////////////////////// Map interface /////////////////////////////////////////////////////////
  var placeSearch, autocomplete;
  function initAutocomplete() {
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
	
	//var detailScript = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+$scope.placeId+"&key="+$scope.mapKey;
	//console.log("detail script!", detailScript);
	//use angularl load to make that request!
	/*angularLoad.loadScript(detailScript).then(function(result){
		console.log("detail search result is ", result);
	});*/
    $scope.selectedLat = $scope.selectedPlace.geometry.location.lat(); // NOTE: setting current lattitude/longitude for distance calculation
    $scope.selectedLng = $scope.selectedPlace.geometry.location.lng();
    console.log('place lat is', $scope.selectedLat);
    console.log('place langtitude is', $scope.selectedLng);
	formatLocation();
  } //fillInAdress

  $scope.getDistanceFromLatLonInKm = function (lat1, lon1, lat2, lon2) {
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

  function addScript(src) {
    var tag = document.getElementById("maptag");
    if (!tag) {
      var s = document.createElement('script');
      s.setAttribute('src', src);
      s.setAttribute('id', "maptag");
      document.body.appendChild(s);
      console.log("adding tag for first time in the run");
      s.onload = initAutocomplete;
    } else {
      console.log("tag alredy added");
      initAutocomplete();
    }//else
    // when the script has finished loading, only THEN call autocomplete()
  }//addScript

  //calling the addScript function
  var mapSrc = "https://maps.googleapis.com/maps/api/js?key=" + $scope.mapKey + "&libraries=places&language=en";  

  addScript(mapSrc);
  /////////////////////////////////////////// Map interface /////////////////////////////////////////////////////////
}]);

},{"../config.js":1}],3:[function(require,module,exports){
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
			$scope.event = res[0];			
    $scope.profiles = [];
    console.log("initial profs for ",$rootScope.currentUser);    
      orService.getOrganizersByUser($rootScope.currentUser).then(function(data2){
        console.log("data 2", data2);
        $scope.profiles = data2;
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
	
	$scope.deleteTempTick = function(index) {
    $scope.event.eventTickets.splice(index, 1);
	$scope.updateQ();// $scope.event.numTickets - 
  }
  
  $scope.resetTickets = function() {
    $scope.event.eventTickets = [];
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
    $scope.event.eventTickets.push(ticket);
	$scope.updateQ();
    
  }
  
  $scope.updateQ = function () {
    $scope.event.numTickets = 0;
    for (var i = 0; i < $scope.event.eventTickets.length; i++) {
      $scope.event.numTickets += $scope.event.eventTickets[i].ticketQ;
    }//for
  }//updateQ
  
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
                createService.updateEvent($scope.event).then(function(res){
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

},{"../config.js":1}],4:[function(require,module,exports){
app.controller('eventCtrl',['$scope' ,'$rootScope','$stateParams','createService', 'purchaseService', '$document','NgMap','angularLoad', '$timeout','$state','$location', function($scope,$rootScope, $stateParams, createService, purchaseService, $document, NgMap, angularLoad, $timeout, $state, $location){
	console.log("state param for event", $stateParams);	
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
		//$scope.ticketQuantityOptions = initQuantityOptions();
		//$scope.selectedQuantity = 1;		
		$scope.ticketSum = 0;		
		$scope.socialLinks = linkService.socialLinks;
	//	initMap();		
		$scope.dummyEvents = createService.dummyEvents;	
		console.log($scope.dummyEvents);

		// setMapSrc();
	} //initialization  
	
	function initQuantityOptions() {
		const ticketQuantityOptions = [];
		for (i=1; i < 11; i++) {
			ticketQuantityOptions.push(i);
		}
		return ticketQuantityOptions;
	}

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
					'eventId': $scope.event._id
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
	  		   
	  
	  //$state.go('/cart');
	//TODO: check that the event has said number of tickets available. if it does, connect to socket and reserve tickets
	// have a request to update the db about and reserve said tickets 
	//
  }// this is where the server requests are sent
  
}]);

},{"../config.js":1}],5:[function(require,module,exports){
app.controller('manageOrganizerCtrl', ['orService','createService','merchService' ,'$timeout', '$scope', '$rootScope', function (orService, createService, merchService, $timeout, $scope, $rootScope) {


  // console.log("root scope usr", $rootScope.currentUser);

  this.$onInit = function() {
    checkUser();
    initTabs();
    initSocialForms();
    organizerPrep();
    // setImageCropStuff();    
  }

  
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
  

  function checkUser() {
    $scope.isUserSignedIn = $rootScope.currentUser;
  } 

  function organizerPrep() {
    orService.getOrganizersByUser($rootScope.currentUser).then(function (result) {
      console.log("All profiles by ", $rootScope.currentUser, result);
      $scope.profiles = result;
      $scope.selectedOrganizer = result[0];
	  createService.getEventsByOrganizer($scope.selectedOrganizer._id).then(function(result){
		//console.log("organizer's events", result);
		$scope.events = result;
		$scope.ongoingOrgEvents = [];
		$scope.pastOrgEvents = [];
		$scope.selectedStatEvent = {};
		for (var i=0;i<$scope.events.length;i++) {
			if (($scope.events[i].ongoing)&&($scope.ongoingOrgEvents.length<10)) {
				$scope.ongoingOrgEvents.push($scope.events[i]);
			} else if ($scope.pastOrgEvents.length<10) {
				$scope.pastOrgEvents.push($scope.events[i]);
			}//else pushing events to approprate arrays
		}//for 
		/*$scope.selectedCurr = $scope.ongoingOrgEvents[0];
		$scope.selectedPast = $scope.pastOrgEvents[0];
		if ($scope.selectedCurr) {
			$scope.selectedStatEvent = $scope.selectedCurr;
		} else {
			$scope.selectedStatEvent = $scope.selectedPast;
		}//else */
		$scope.setBarData($scope.ongoingOrgEvents);
		console.log("this organizer's current events",$scope.ongoingOrgEvents);
	});
    }, function (err) {
      throw (err)
    })//GET request route 
  }

  function initSocialForms() {
    $scope.socialForms = [
      { name: 'Facebook', model: $scope.fbInput },
      { name: 'Instagram', model: $scope.igInput },
      { name: 'Snapchat', model: $scope.scInput },
      { name: 'Twitter', model: $scope.twitInput },
      { name: 'LinkedIn', model: $scope.liInput },
    ]
  }
  
  $scope.showOrg = function() {
	  console.log("selected organizer", $scope.selectedOrganizer);
  }

  $scope.selectedItemChanged = function (selectedOrganizer) {
    console.log('you picked option:', selectedOrganizer );
	$scope.selectedOrganizer = selectedOrganizer;
	createService.getEventsByOrganizer(selectedOrganizer._id).then(function(result){
		//console.log("organizer's events", result);
		$scope.events = result;
		$scope.ongoingOrgEvents = [];
		$scope.pastOrgEvents = [];		
		for (var i=0;i<$scope.events.length;i++) {
			if (($scope.events[i].ongoing)&&($scope.ongoingOrgEvents.length<10)) {
				$scope.ongoingOrgEvents.push($scope.events[i]);
			} else if ($scope.pastOrgEvents.length<10) {
				$scope.pastOrgEvents.push($scope.events[i]);
			}//else pushing events to approprate arrays
		}//for 
		$scope.setBarData($scope.ongoingOrgEvents);
	});
  }//when organizer changes 
  
  $scope.selectedStatEventChanged = function(evt) {
	  console.log("selected event: ", evt);
	  $scope.selectedStatEvent = evt;
	  setDonutData();
	  setPieData();
  }//when event changes for STATS 
  
   $scope.selectedAttendingEventChanged = function(evt) {
	  createService.getAttendees(evt._id).then(function(result){
		  $scope.tickets = result;
		  console.log("found tickets", $scope.tickets);
	  })
  }//when event changes for STATS 
  //$scope.selectedAttendingEventChanged();

  //// ===================== tabs stuff ===========================
  function initTabs() {
    $scope.tab = 4;
    $scope.organizerTabs = ['Organizer Info', 'Stats', 'Manage Events', 'Merchant profile', 'Check Attendees', 'Organizer Settings'];
  }

  $scope.setTab = function (newTab) {
    $scope.tab = newTab;
  };

  $scope.isSet = function (tabNum) {
    return $scope.tab === tabNum;
  }
  
  //// ===================== chart stuff ===========================
  function getRandomColor() {

  }
  $scope.setBarData = function(evts) {
	   $scope.barData = [];
	  $scope.barLabels = [];
	  for (var i=0;i<evts.length;i++) {
		  $scope.barLabels[i] = evts[i].title;
		  $scope.barData[i] = 0;
		  for (var j=0;j<evts[i].eventTickets.length;j++) {
			  $scope.barData[i] +=evts[i].eventTickets[j].ticketsSold*evts[i].eventTickets[j].ticketPrice;
		  }// for event tickets 
	  }//for evts 
	  console.log("bar data", $scope.barData);
  }//set bar data
  setDonutData = function() {
	  $scope.donutData = [];
	  var totalSold = 0;
	  var total = 0;
	  for (var i=0;i<$scope.selectedStatEvent.eventTickets.length;i++) {
		  totalSold+= $scope.selectedStatEvent.eventTickets[i].ticketsSold;
		  total+= $scope.selectedStatEvent.eventTickets[i].ticketQ;
	  }	  
	  $scope.donutData[0] = totalSold;
	  $scope.donutData[1] = total;
  }//setDonutData 
  setPieData = function() {
	  $scope.pieData = [];
	  $scope.pieLabels = [];	  
	  for (var i=0;i<$scope.selectedStatEvent.eventTickets.length;i++) {
		  $scope.pieLabels[i] = $scope.selectedStatEvent.eventTickets[i].ticketType;
		  $scope.pieData[i] = $scope.selectedStatEvent.eventTickets[i].ticketsSold;
	  }	  
	  //$scope.donutData[0] = totalSold;
	  //$scope.donutData[1] = total;
  }//setDonutData 
  $scope.donutLabels = ["sold", "available"];
  //$scope.barLabels = ["dank sesh", "chalice palace", "toker heaven", "sativa-sesh", "smoke break", "cali-greens", "tacos and titties"];
  /*$scope.barData = [
    [65, 59, 80, 57, 96, 58, 85],
  ];*/

  $scope.barColors = ['', 'orange', 'red', 'green', 'blue', 'lightgrey', ]

  $scope.barClick = function (points, evt) {
    console.log(points, evt);
  };

  //// ===================== manage events(by organizer) ===========================
  
  //// ===================== manage events ===========================
  
  //// ===================== ng-quill stuff ===========================
  $scope.title = '';
  $scope.changeDetected = false;
  $scope.saveQuill = function() {
    var deltaContents = $scope.editor.getContents();
    //console.log(deltaContents);
    localStorage.setItem('deltaContents', JSON.stringify(deltaContents));
  }
  function getQuillDelta() {
    var deltaContents = JSON.parse(localStorage.getItem('deltaContents'));
    return deltaContents;
  }
  $scope.editorCreated = function (editor) {
      //console.log(editor);
      $scope.editor = editor;

      var existingDelta = getQuillDelta();
      if (existingDelta) {
        editor.setContents(existingDelta);
      } else {
        console.log('no previous deltas');
        return;
      }
  };
  $scope.contentChanged = function (editor, html, text, delta, oldDelta) {
      $scope.changeDetected = true;
      console.log($scope.title);
      console.log('editor: ', editor, 'html: ', html, 'text:', text, 'delta:', delta, 'oldDelta:', oldDelta);
  };
  //////////////////////******************************** MERCHANT STUFF *******************************//////////////
  var config = require('../config.js');
  var merchKey = config.MERCHANT_PRIVATE_API_KEY;
  var mcc = config.MERCHANT_MCC;
  //console.log("merchant key is "+merchKey+" and mcc is "+mcc);
  $scope.createMerchant = function() {
	  var mockMerch = {
		  "isNew": "0",
		  "established":"20101020",
		  "annualCCSales": "100000",
		  "mcc": mcc,
		  "status":"1", 
	  }
	  var mockEntity = {
          "name": "Real OG Kush 2",		  
		  "type":"1",
		  "address1": "123 North 12 St",
		  "city": "Miami",
		  "state": "FL",
		  "zip": "33024",
		  "country": "USA", //gonna be USA for all the them. most likely
		  "phone": "1234567891",
		  "email": "support@example.com",
		  "ein": "123456789",
		  "website": "http://www.example.com"
	  };
	  mockEntity.accounts = [];
	  mockEntity.accounts[0] = {
		  "primary": "1",
		  "account": {
		  "method": "8",
		  "number": "023456789012345",
		  "routing": "063013924"
		  }//accouts[].account
	  };
	  var mockMembers = [];
	  mockMembers[0] = {
		  "first": "James",
		  "last": "Smith",
		  "title": "CEO",
		  "dob": "19590122",
		  "ownership": "8000",
		  "email": "james.smith@example.com",
		  "ssn": "123456789",
		  "address1": "123 Example St.",
		  "city": "New York",
		  "state": "NY",
		  "zip": "10001",
		  "country": "USA", //always. See entity country		   
		  "primary": "1"
	  };
            /*-d members[0][dl]="123456789" \ DRIVERS LICENSE
            -d members[0][dlstate]="NY" */
			//console.log("mcc is"+mcc);
	merchService.createMerchant(merchKey, mockEntity, mockMembers, mockMerch).then(function(response){
		  //console.log("merchant controller response is", response.response.data[0]);
		  //console.log("merhcant id is "+response.response.data[0].id);
		  $scope.selectedOrganizer.merchantId = response.response.data[0].id;		  
		  orService.updateOrganizer($scope.selectedOrganizer).then(function(response){
			  console.log("updated organizer object ",response);
		  });
	  });	  
	  /*merchService.createMerchat(key, mcc, $scope.entity, $scope.merchant, $scope.bank, $scope.owner).then(function(response){
		  console.log("merchant controller response is", response);
	  });*/
  };
  //$scope.createMerchant();
}]);
},{"../config.js":1}],6:[function(require,module,exports){
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
               $scope.showCheckout = false;
				getDankCartTotal();
			});						
		}//onInit 		
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
            //console.log("merchant is", merchant);
            $scope.purchasedTickets = merchant.tickets;	
			$scope.merchId = merchant.merchantId;
            console.log("purchased tickets ", $scope.purchasedTickets);
			
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
     // We will flash success response on button and clear the iframe inputs     
      $("#button").text("Success");
      $("#button").css(
      {"backgroundColor": "rgb(79,138,16)", "transition": "2s"}
	  );	  
	  for (var i=0;i<$scope.purchasedTickets.length;i++) {
		  $scope.purchasedTickets[i].owner = $rootScope.currentUser;
	  }//for imprinting purchaser
	  //post tickets to collection on mongo 
	  purchaseService.addTickets($scope.purchasedTickets).then(function(result){		 
		 console.log("ticket addition result", result); 
		 for (i=0;i<$scope.dankCart.length;i++) {
			 if ($scope.merchId===$scope.dankCart[i].merchantId) {
				 $scope.dankCart.splice(i, 1);
			 }// if splicing merchant after payment 
		 }// 
		 purchaseService.saveCart($rootScope.currentUser, $scope.dankCart).then(function(result){
			     //console.log("spliced the cart!");
				 getDankCartTotal();
			});	
	  });	  
	  // PRINT RECIPT     
	}// payment success CB		
	}]);
},{"../config.js":1}]},{},[2,3,4,5,6]);
