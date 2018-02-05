<<<<<<< HEAD
app.controller('manageOrganizerCtrl', ['orService', '$scope', '$rootScope','Upload', function (orService, $scope, $rootScope, Upload) {
=======
app.controller('manageOrganizerCtrl', ['Upload', 'orService', '$timeout', '$scope', '$rootScope', function (Upload, orService, $timeout, $scope, $rootScope) {
>>>>>>> cb896112858ee6b5ba0daf09d3a19e2e7c825058

  // console.log("root scope usr", $rootScope.currentUser);

  this.$onInit = () => {
    checkUser();
    initTabs();
    initSocialForms();
    organizerPrep();
    // setImageCropStuff();
    $scope.picFile = '';
    $scope.croppedDataUrl = '';
  }

  $scope.test = function() {
    console.log($scope.croppedDataUrl);
    console.log($scope.picFile);
    console.log($scope.ngfDataUrl);
  }

  function checkUser() {
    $scope.isUserSignedIn = $rootScope.currentUser;
  }

  $scope.upload = function (dataUrl, name) {
    Upload.upload({
        url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
        data: {
            file: Upload.dataUrltoBlob(dataUrl, name)
        },
    }).then(function (response) {
        $timeout(function () {
            $scope.result = response.data;
        });
    }, function (response) {
        if (response.status > 0) $scope.errorMsg = response.status 
            + ': ' + response.data;
    }, function (evt) {
        $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
    });
}

  // function setImageCropStuff() {
  //   $scope.myImage='';
  //   $scope.myCroppedImage='';
  // }

  // $scope.handleFileSelect=function(evt) {
  //   var file=evt.currentTarget.files[0];
  //   var reader = new FileReader();
  //   reader.onload = function (evt) {
  //     $scope.$apply(function($scope){
  //       $scope.myImage=evt.target.result;
  //     });
  //   };
  //   reader.readAsDataURL(file);
  // };

  function organizerPrep() {
    orService.getOrganizersByUser($rootScope.currentUser).then(function (result) {
      console.log("All profiles by ", $rootScope.currentUser, result);
      $scope.profiles = result;
      $scope.selectedOrganizer = result[0];
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
  }

  //// ===================== tabs stuff ===========================
  function initTabs() {
    $scope.tab = 0;
    $scope.organizerTabs = ['Profile', 'Dashboard', 'Manage Events', 'Create Event', 'Add Sub-Organizer', 'Check Attendees'];
  }

  $scope.setTab = function (newTab) {
    $scope.tab = newTab;
  };

  $scope.isSet = function (tabNum) {
    return $scope.tab === tabNum;
  };

}]);
