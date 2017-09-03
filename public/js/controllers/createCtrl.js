app.controller('createCtrl',['createService','$scope' ,'Upload','$window', function(createService, $scope, Upload, $window){
  // $scope.makeTicket = function(ticketType) {
  //   // createService.createInstance
  //
  // }//makeTicket
  ////////////////////file upload /////////////////////////////////////////////////////////////

        $scope.submit = function(){ //function to call on form submit
              //TODO: check if from is valid
              // var submitExp = document.getElementById('fileItem').files[0];
              //
              // console.log("in submit! uploading...", submitExp);
              //   $scope.upload(submitExp); //call upload function
              console.log($scope.startDate);
              console.log("its a ", $scope.startDate.value);
        }
        $scope.upload = function (file) {
            Upload.upload({
                url: 'http://localhost:8000/upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                  console.log("controller response is", resp);
                    $window.alert('Success ');// + resp.config.data.file.name + 'uploaded. Response: ');
                } else {
                    $window.alert('an error occured');
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function (evt) {
                console.log(evt);
                // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                // $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };//file

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
  console.log('place lat is', $scope.selectedPlace.geometry.location.lat());
  console.log('place langtitude is', $scope.selectedPlace.geometry.location.lng());
  $scope.selectedLat = $scope.selectedPlace.geometry.location.lat(); // NOTE: setting current lattitude/longitude for distance calculation
  $scope.selectedLng = $scope.selectedPlace.geometry.location.lng();
} //fillInAdress

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
// $scope.geolocate = function() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var geolocation = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       }; //geolocation object
//       console.log("my current location ", geolocation);
//     }); //navigation callback
//   }//if
// } //geoLocate
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
  var mapSrc = "https://maps.googleapis.com/maps/api/js?key="+$scope.mapKey+"&libraries=places";
  addScript(mapSrc);



/////////////////////////////////////////// Map interface /////////////////////////////////////////////////////////
/////////////////////////////////////////// Image handling /////////////////////////////////////////////////////////
$scope.preview = function() {
    var prevFile = document.getElementById('fileItem').files[0];
    var img = document.createElement("img");
    img.classList.add("obj");
    img.file = prevFile;
    img.height = 250;
    img.width = 250;
    console.log("img object to be added", img);
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
