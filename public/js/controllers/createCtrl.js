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
    console.log("initial profs", $rootScope.currentUser);
    userService.getUserByName($rootScope.currentUser).then(function (user) {
      $scope.user = user;
      console.log("create user is", $scope.user);
      orService.getOrganizersByUser($scope.user._id).then(function (data2) {
        console.log("data 2", data2);
		if (data2) {
			for (var i = 0; i < data2.length; i++) {
			  $scope.profiles[i] = data2[i];
			}//for
		}//if 
      })//get organizers
    })//userFactory cb
  }//initProfs //NOTE we need the user fetching here to get that owner id
  // initProfs();
  $scope.selectProf = function () {
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
            }, 2000);
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
