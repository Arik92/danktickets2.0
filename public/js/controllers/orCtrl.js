app.controller('orCtrl',['$scope' ,'$window', 'Upload', function($scope, $window, Upload){
        ////////////////////file upload /////////////////////////////////////////////////////////////
        console.log("entered organizer profileee");
        $scope.submit = function(){ //function to call on form submit
              //TODO: check if from is valid
              var submitExp = document.getElementById('fileItem').files[0];
              console.log("in submit! uploading...", submitExp);
                $scope.upload(submitExp); //call upload function
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

  $scope.add = function(type) {
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
      alert("fill enter an organizer name");
      return false;
    }
    return true;
  }//checkNames
}]);
