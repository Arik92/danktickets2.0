app.controller('editProfileCtrl',['orService','userService','$scope' ,'Upload','$window','$timeout','$rootScope','$location','$stateParams', function(orService, userService, $scope, Upload, $window, $timeout, $rootScope, $location, $stateParams){
		console.log("edit profile state params",$stateParams);
		function profileServiceinit() {
		orService.getOrganizerById($stateParams.id).then(function(result, err){
			if (err) {
				console.log("an error fetching profile with id occured");
			} else {
				console.log("result is", result);
			$scope.profile = result[0];
			console.log("received profile is", $scope.profile);
			}//else
		});
		};
		this.$onInit = () => {
			console.log('init fired');
			profileServiceinit();
		}//onInit		
        $scope.upload = function () {
        var submitPic = document.getElementById('fileItem').files[0];
        console.log("in submit! uploading...", submitPic);        
          if (submitPic) {
            Upload.upload({
                url: 'http://danktickets.herokuapp.com/organizers/deleteAndUpload', //webAPI exposed to upload the file
                data: {
                  file:submitPic,
                   organizer: $scope.profile
                 } //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                console.log("controller response is", resp);
                if(resp.data.error_code === 0){ //validate success
                  console.log("response file object", resp.config.data.file);
                  console.log("updated organizer successfully!");
                  $scope.showRedirect = true;
                  $timeout(function() {
                    $location.path('/');
                  }, 2000);
                    //$window.alert('Success'  + resp.config.data.file.name + ' uploaded');
                    $scope.imageName = resp.data.file_name;
                    console.log("image name will be?", $scope.imageName);
                  //  publishEvent(); // call a function to submit the whole event
                } else {
                    $window.alert(resp.data.error_code);
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
          orService.updateOrganizer($scope.profile).then(function(resp){
            console.log("profile updated successfully through service!")
                  $scope.showRedirect = true;
                  $timeout(function() {
                    $location.path('/');
                  }, 2000);
          })
      }//else
    };//scope.upload

  //////////////////////file upload /////////////////////////////////////////////////////////////
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
