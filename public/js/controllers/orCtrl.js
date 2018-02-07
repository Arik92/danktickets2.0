app.controller('orCtrl', ['orService', 'userService', '$scope', '$window', '$timeout', '$rootScope', '$location', function (orService, userService, $scope, $window, $timeout, $rootScope, $location) {
  
  userService.getUserByName($rootScope.currentUser).then(function (user) {
    $scope.user = user;
    console.log("create user is", $scope.user);
    /*orService.getOrganizersByUser($scope.user._id).then(function (data2) {
      console.log("data 2", data2);
      for (var i = 0; i < data2.length; i++) {
        $scope.profiles[i] = data2[i];
      }//for
    })//get organizers */
  })//userFactory cb

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
  $scope.upload = function () {        
    var organizer = {
	  version: 1,
      name: $scope.oName,
      owner: $rootScope.currentUser,
      about: $scope.oDesc,
      website: $scope.oSite,
      facebook: $scope.oFace,
      twitter: $scope.oTwitt,
      instagram: $scope.oInst,
	  image: $scope.previewImg
    };// event post object    
      orService.postOrganizer(organizer).then(function (resp) {
        console.log("Organizer added successfully through service!");
		$scope.showRedirect = true;
		$timeout(function () {
            $location.path('/');
          }, 2000);
      })  
  };//scope.upload
}]);
