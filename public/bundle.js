(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var config = {
  MAPS_API_KEY: 'AIzaSyBlqLa-v1ZicvzAhvzPyX4p0mbXIzYjGEk',
  STATIC_MAPS_API_KEY: 'AIzaSyDaLn2AKXRJk06q8AUzN11XWQuuKlprlvM'
};
module.exports = config; 
},{}],2:[function(require,module,exports){
app.controller('createCtrl', ['createService', 'orService', 'userService', '$scope', 'Upload', '$window', '$timeout', '$rootScope', '$location', 'angularLoad', function (createService, orService, userService, $scope, Upload, $window, $timeout, $rootScope, $location, angularLoad) {
  console.log('hello from createCtrl');
  this.$onInit = () => {
	$scope.currentTickets = [];	
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
      free: isFree
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
	/*var dummyProf = {
		'_id': -1,
		'name': "Select an organizer profile"
	}*/
	//$scope.profiles.push(dummyProf);
	$scope.pleaseSelectOrg = true;
	$scope.selectedProfile = "Select an organizer";	
	//$scope.selectedOrganizer = "(please choose one)";
	//$scope.selectedOrganizer = $scope.profiles[0];
    console.log("initial profs", $rootScope.currentUser);
    userService.getUserByName($rootScope.currentUser).then(function (user) {
      $scope.user = user;
      console.log("create user is", $scope.user);
      orService.getOrganizersByUser($scope.user.username).then(function (data2) {
        console.log("data 2", data2);
		if (data2) {
			for (var i = 0; i < data2.length; i++) {
			  $scope.profiles.push(data2[i]);
			}//for			
		//$scope.$apply();	
		console.log("profiles", $scope.profiles);
		}//if 
      })//get organizers
    })//userFactory cb
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
    if (diff > 0) {
      return true;
    } else {
      return false;
    }        //else
  }//compareDates

  function validator() {
    var validatorError = "ok";
    if ($scope.compareDates() === false) {
      validatorError = "Invaid Event dates! Make sure the event dates are valid";
    }
    return validatorError;
  }//validator

  $scope.upload = function () {
    var submitPic = document.getElementById('fileItem').files[0];
    console.log("in submit! uploading...", submitPic);
    var evt = {
	  version: 1,
      title: $scope.eName,
      owner: $scope.user._id,
      organizer: $scope.selectedOrganizer,
      type: $scope.selectedType,
      location: $scope.location,
      //image: $scope.imageName, 95% sure this is only defined in th routes
      startTime: $scope.startDate,
	  startDateDisplay: $scope.startDateDisplay,
      startHr: $scope.startHr,
      endTime: $scope.endDate,
	  endDateDisplay: $scope.endDateDisplay,
      endHr: $scope.endHr,
      description: $scope.eDesc,
      numTickets: $scope.totalTickets, //tickets remaining
      isPrivate: $scope.isPrivate,
      showRemainingTicks: $scope.showRemain
    };// event post object
    evt.eventTickets = [];
    for (var i = 0; i < $scope.currentTickets.length; i++) {
      evt.eventTickets.push($scope.currentTickets[i]);
    }// for filling ticket array
    var isLegit = validator();
    if (isLegit.localeCompare("ok") === 0) {
      //console.log("compared " + isLegit + " and ok. and the result is" + isLegit.localeCompare("ok"));
      if (submitPic) {
        Upload.upload({ // 'http://localhost:8000/events/upload'
          //url: 'http://localhost:8000/events/upload',
           url: 'https://danktickets.herokuapp.com/events/upload',//webAPI exposed to upload the file
          data: {
            file: submitPic,
            event: evt
          } //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
          console.log("controller response is", resp);
          if (resp.data.error_code === 0) { //validate success
            console.log("response file object", resp.config.data.file);
            console.log("added event successfully!");
            $scope.showRedirect = true;
            $timeout(function () {
              $location.path('/');
            }, 500);
            //$window.alert('Success'  + resp.config.data.file.name + ' uploaded');
            $scope.imageName = resp.data.file_name;
            console.log("image name will be?", $scope.imageName);
            //  publishEvent(); // call a function to submit the whole event
          } else {
            console.log(resp.data);
            $window.alert("response is", resp.data);
          }
        }, function (error) { //catch error
          console.log('Error status: ' + error);
          // $window.alert('Error status: ' + resp.status);
          // }, function (evt) {
          //     console.log(evt);
          //     // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          //     // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          //     // $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
          // });
        });
      } else {
        createService.postEvent(evt).then(function (resp) {
          console.log("Event added successfully through service!")
		  $scope.showRedirect = true;
            $timeout(function () {
              $location.path('/');
            }, 500);
        })
      }
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
  /////////////////////////////////////////// Image handling /////////////////////////////////////////////////////////
  $scope.preview = function () {
    var prevFile = document.getElementById('fileItem').files[0];
    var img = document.createElement("img");
    img.classList.add("obj");
    img.file = prevFile;
    img.height = 250;
    img.width = 250;
    //console.log("img object to be added", img);
    document.getElementById('preview').removeChild(document.getElementById('preview').firstChild);
    document.getElementById('preview').appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.
    //TODO: need to specify preview size
    //file reader
    var reader = new FileReader();
    reader.onload = (function (aImg) {
      return function (e) {
        aImg.src = e.target.result;
        //console.log("reader result:", reader.result);
      };
    })
      (img);
    reader.readAsDataURL(prevFile);
  }//handleFiles

  function checkNames() {
    var patt = /w+/;
    if (!$scope.eName) {
      alert("fill enter an event name");
      return false;
    }
    return true;
  }//checkNames
}]);

},{"../config.js":1}],3:[function(require,module,exports){
app.controller('editCtrl',['createService','orService', 'userService', '$scope' ,'Upload','$window','$stateParams','$timeout','$location','$rootScope', function(createService, orService, userService, $scope, Upload, $window, $stateParams, $timeout, $location, $rootScope){
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
        for (var i=0;i<data2.length;i++) {
          $scope.profiles[i] = data2[i];
        }//for
		initStartDatePicker();
		initEndDatePicker();
      })//get organizers  
		}//else
	  });//getEventById
  }//initProfs
  
  this.$onInit = () => {
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
        $scope.submit = function(){ //function to call on form submit
              //TODO: check if from is valid
              //TODO: Now I check if the image file has been changed.
              if (typeof $scope.selectedPlace!="undefined") {
                console.log("type is not undefined!");
                $scope.event.location.locationMapUrl = $scope.selectedPlace.url;
                $scope.event.location.latlng.lat = $scope.selectedLat;
                $scope.event.location.latlng.lng = $scope.selectedLng;
                $scope.event.location.locationName = $scope.selectedPlace.formatted_address;
              } // if the location changed
              console.log("submit pic is",document.getElementById('fileItem').files[0] );
              var submitPic = document.getElementById('fileItem').files[0];
              console.log("in submit! uploading...", submitPic);
              if (submitPic) {
                Upload.upload({ //'https://danktickets.herokuapp.com/events/deleteAndUpload' 'http://localhost:8000/events/deleteAndUpload'
                    url: 'https://danktickets.herokuapp.com/events/deleteAndUpload', //exposed to upload the file
                    data: {
                     file: submitPic,
                     event: $scope.event
                  } //pass file as data, should be user ng-model
                }).then(function (resp) { //upload function returns a promise
                    if(resp.data.error_code === 0){ //validate success
                      //console.log("controller response is", resp);
                      console.log("response file object", resp.config.data.file);
                        console.log("update event successfully!, redirect");
                        $scope.showRedirect = true;
                        $timeout(function() {
                          $location.path('/');
                        }, 2000);
                      // call a function to submit the whole event
                    } else {
                        $window.alert('an error occured');
                        console.log("rsponse data", resp.data);
                    }
                }, function (resp) { //catch error
                    console.log('Error status: ' + resp.status);
                    $window.alert('Error status: ' + resp.status);
                });
              } else {
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
              }//else just update the event
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
      types: ['geocode']
    });
  console.log('autocomplete is', autocomplete)
  // console.log('autocomplete', autocomplete);
  autocomplete.addListener('place_changed', fillInAddress);
}
function fillInAddress() {
  // Get the place details from the autocomplete object.
  $scope.selectedPlace = autocomplete.getPlace();
  console.log('place is', $scope.selectedPlace);
  console.log('place lat is', $scope.selectedPlace.geometry.location.lat());
  console.log('place langtitude is', $scope.selectedPlace.geometry.location.lng());
  $scope.selectedLat = $scope.selectedPlace.geometry.location.lat(); // NOTE: setting current lattitude/longitude for distance calculation
  $scope.selectedLng = $scope.selectedPlace.geometry.location.lng();
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

/////////////////////////////////////////// Map interface /////////////////////////////////////////////////////////
/////////////////////////////////////////// Image handling /////////////////////////////////////////////////////////
$scope.preview = function() {
  $scope.updatedImage = true;
    var prevFile = document.getElementById('fileItem').files[0];
    var img = document.createElement("img");
    img.classList.add("obj");
    img.file = prevFile;
    img.height = 250;
    img.width = 250;
    //console.log("img object to be added", img);
    document.getElementById('preview').removeChild(document.getElementById('preview').firstChild);
    document.getElementById('preview').appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.
      //TODO: need to specify preview size
      //file reader
    var reader = new FileReader();
    reader.onload = (function(aImg) {
       return function(e) {
     aImg.src = e.target.result;
     //console.log("reader result:", reader.result);
     };
     })
     (img);
    reader.readAsDataURL(prevFile);
}//handleFiles

function checkNames() {
    var patt = /w+/;
    if (!$scope.eName) {
      alert("fill enter an event name");
      return false;
    }
    return true;
  }//checkNames
  

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
app.controller('eventCtrl',['$scope' ,'$rootScope','$stateParams','createService', '$document','NgMap','angularLoad', '$timeout','$state','$location', function($scope,$rootScope, $stateParams, createService, $document, NgMap, angularLoad, $timeout, $state, $location){
	console.log("state param for event", $stateParams);	
	this.$onInit = () => {
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
		$scope.ticketsToAdd = 0;
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
		$timeout(() => {
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
			$scope.ticketCart = [];	
			for (var i=0;i<$scope.event.eventTickets.length;i++) {
				var cartObj = {
					'ticketName': $scope.event.eventTickets[i].ticketName,
					'ticketPrice': $scope.event.eventTickets[i].ticketPrice,					
					'howMany': 0,
					'title': $scope.event.title,
					'eventId': $scope.event._id
				}//ticketCart object
				$scope.ticketCart.push(cartObj);
			}//for 			
			console.log("after loop", $scope.ticketCart);
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
	
	$scope.cartPlus = function(index) {
	  console.log("ticket cart", $scope.ticketCart);
	  $scope.ticketCart[index].howMany++;
		if ($scope.ticketCart[index].howMany<=$scope.ticketCart[index].ticket.ticketQ) {
	  $scope.updateSum();
		} else {
		$scope.ticketCart[index].howMany--;
	 }//else 
	}//cartplus
	
   $scope.cartMinus = function(index) {	 
   if ($scope.ticketCart[index].quantity>0) {	
 $scope.ticketCart[index].howMany--;   
	  	  $scope.updateSum();
	  }//else
	}//cartMinus
	
	$scope.updateSum = function() {
		$scope.ticketSum = 0;
		for (var i=0;i<$scope.ticketCart.length;i++) {
			if ($scope.ticketCart[i].howMany>0) {
			$scope.ticketSum+= $scope.ticketCart[i].ticketPrice*$scope.ticketCart[i].howMany;
			}//if ticet sum is greater than 0 somehow(user bruteforcing negative value
		}//for 
	} //update sum to update any changes made to ticket quantities

	$scope.removeFromCart = function(index) {
		//$scope.ticketSum-=$scope.ticketCart[index].ticketPrice*$scope.ticketCart[index].ticketQ; feels DRY
	 $scope.ticketCart.splice(index, 1);
	 $scope.updateSum();
	}//rrmove from cart
  $scope.checkout = function() {
	  console.log("final checkout",$scope.ticketCart);
	  for (var i=0;i<$scope.ticketCart.length;i++) {
		  if ($scope.ticketCart[i].howMany<=0) {
			  $scope.ticketCart.splice(i,1);
		  }//if
	  }//for cleaning out empty entries
	  var storageCart= localStorage.getItem('dankCart');
	  //console.log("storage cart", storageCart);
	  //console.log("what are you?", typeof(storageCart));
	  if (storageCart) {
		//var cartData = storageCart;
		var cartData = JSON.parse(storageCart);
		//console.log("the type of cartdata",typeof(cartData));
		//console.log("the type of cartdata",cartData);
		//console.log("cart data after stringify", cartData);
	   	for (var j=0;j<cartData.length;j++) {
			//console.log("current cartData", cartData[j]);
			$scope.ticketCart.push(cartData[j]);
		}//for looping ticket cart 
			  //localStorage.setItem('dankCart', JSON.stringify(cartData)); // if merging was made, 
	  }else {		 	 
	  }//else not loading a new cart
	  //console.log("cart before setting", $scope.ticketCart);
	   localStorage.setItem('dankCart', JSON.stringify($scope.ticketCart));
	  $timeout(function () {
              $location.path('/cart');
            }, 2000);
	  //$state.go('/cart');
	//TODO: check that the event has said number of tickets available. if it does, connect to socket and reserve tickets
	// have a request to update the db about and reserve said tickets 
	//
  }// this is where the server requests are sent
  
}]);

},{"../config.js":1}]},{},[2,3,4]);
