app.controller('createCtrl',['createService','$scope' ,'Upload','$window','$timeout','$rootScope','$location', function(createService, $scope, Upload, $window, $timeout, $rootScope, $location){
  $scope.typeOptions = [
    'Concert',
    'Meeting',
    'Convention',
    'Party',
    'Other'
  ];
  //////////////////////////////////// initializing pickers ////////////////////////////////////////////
  //TODO: when loading an event, set the start/end dates accordingly
  var startDatepicker = datepicker('#start_date', {
  position: 'br', // Top right.
  startDate: new Date(), // This month.
  dateSelected: new Date(), // Today is selected.
  minDate: new Date(), // June 1st, 2016.
  maxDate: new Date(2099, 0, 1), // Jan 1st, 2099. //TODO: expand this dynamicly? maybe
  noWeekends: false,
  formatter: function(el, date) {
    // This will display the date as `1/1/2017`.
    el.value = date.toDateString();
  },
  onSelect: function(instance) {
    // Show which date was selected.
    console.log("start date: ", instance.dateSelected);
    $scope.startDate = instance.dateSelected;
    console.log("as string?", $scope.startDate.toDateString());
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

var endDatepicker = datepicker('#end_date', {
position: 'br', // Top right.
startDate: new Date(), // This month.
dateSelected: new Date(), // Today is selected.
minDate: new Date(), // June 1st, 2016.
maxDate: new Date(2099, 0, 1), // Jan 1st, 2099. //TODO: expand this dynamicly? maybe
noWeekends: false,
formatter: function(el, date) {
  // This will display the date as `1/1/2017`.
  el.value = date.toDateString();
  $scope.exampleDate = date;
},
onSelect: function(instance) {
  // Show which date was selected.
  console.log("End date: ", instance.dateSelected);
  $scope.endDate = instance.dateSelected;
  console.log("as object", $scope.endDate);
  console.log("exp date", $scope.exampleDate);
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
  $scope.endHr = $scope.startHr;
};
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
       function publishEvent() {
         var evt = {
           title: $scope.eName,
           publisher: $rootScope.userDetails.username,
           type: $scope.selectedType,
           location: {
               locationMapUrl: $scope.selectedPlace.url,
                 latlng: {
                 lat: $scope.selectedLat,
                 lng: $scope.selectedLng
                },
               locationName: $scope.selectedPlace.formatted_address
             },
           image: $scope.imageName,
           startTime: $scope.startDate.toDateString(),
           startHr: $scope.startHr,
           endTime: $scope.endDate.toDateString(),
           endHr: $scope.endHr,
           description: $scope.eDesc,
           numTickets: $scope.totalTickets, //tickets remaining
           isPrivate: $scope.isPrivate,
           showRemainingTicks: $scope.showRemain
         };// event post object
         evt.tickets = [];
         for (var i=0;i<$scope.tempTicks.length;i++) {
           evt.tickets.push($scope.tempTicks[i]);
         }// for filling ticket array
         createService.postEvent(evt).then(function(res){
           console.log("added event successfully!");
           $scope.showRedirect = true;
           $timeout(function() {
             $location.path('/');
           }, 2000);
         }, function(err){
           console.log("controller error promise");
           console.error(err);
         });
       }//publishEvent
        $scope.submit = function(){ //function to call on form submit
              //TODO: check if from is valid
              var submitPic = document.getElementById('fileItem').files[0];
              console.log("in submit! uploading...", submitPic);
                $scope.upload(submitPic);
        }
        $scope.upload = function (file) {
            Upload.upload({
                url: 'http://localhost:8000/upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                console.log("controller response is", resp);
                if(resp.data.error_code === 0){ //validate success
                  console.log("response file object", resp.config.data.file);
                    //$window.alert('Success'  + resp.config.data.file.name + ' uploaded');
                    $scope.imageName = resp.data.file_name;
                    console.log("image name will be?", $scope.imageName);
                    publishEvent(); // call a function to submit the whole event
                } else {
                    $window.alert('an error occured');
                }
            }, function (error) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            // }, function (evt) {
            //     console.log(evt);
            //     // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //     // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            //     // $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            // });
          });
        };//scope.upload

  //////////////////////file upload /////////////////////////////////////////////////////////////

  var config = require('../config.js');
  $scope.mapKey = config.MAPS_API_KEY;
  //console.log("key is: ", $scope.mapKey);
  $scope.add = function(type) {
    var isFree = false;
    if (type==='Free') {
      isFree = true;
    }
    var ticket = {
      ticketType: type,
      ticketPrice: 0,
      ticketName: type+" Ticket",
      ticketQ: 0,
      free: isFree
    }
    console.log("added ticket is ",ticket);
    createService.addticket(ticket);
    $scope.getCurrentTickets();
  }
  $scope.getCurrentTickets = function() {
    $scope.tempTicks = createService.getTempTicks();
    $scope.updateQ();
  }
  $scope.updateQ = function() {
    $scope.totalTickets = 0;
    for (var i=0;i<$scope.tempTicks.length;i++) {
      $scope.totalTickets+=$scope.tempTicks[i].ticketQ;
    }//for
  }//updateQ
  $scope.delete = function(index) {
    createService.deleteTempTick(index);
    $scope.getCurrentTickets();
  }
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
  $scope.selectedLat = $scope.selectedPlace.geometry.location.lat(); // NOTE: setting current lattitude/longitude for distance calculation
  $scope.selectedLng = $scope.selectedPlace.geometry.location.lng();
  console.log('place lat is', $scope.selectedLat);
  console.log('place langtitude is', $scope.selectedLng);
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
  addScript(mapSrc);
  createService.resetTicks();
/////////////////////////////////////////// Map interface /////////////////////////////////////////////////////////
/////////////////////////////////////////// Image handling /////////////////////////////////////////////////////////
$scope.preview = function() {
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
}]);

///////////////////////////////**********************  SPLIT   **************************/////////////////////////////////////
