app.controller('manageOrganizerCtrl', ['orService','createService', '$timeout', '$scope', '$rootScope', function (orService, createService, $timeout, $scope, $rootScope) {


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
	createService.getEventsByOrganizer(selectedOrganizer._id).then(function(result){
		//console.log("organizer's events", result);
		$scope.events = result;
	});
  }

  //// ===================== tabs stuff ===========================
  function initTabs() {
    $scope.tab = 1;
    $scope.organizerTabs = ['Organizer Info', 'Stats', 'Manage Events', 'Add Sub-Organizer', 'Check Attendees', 'Organizer Settings'];
  }

  $scope.setTab = function (newTab) {
    $scope.tab = newTab;
  };

  $scope.isSet = function (tabNum) {
    return $scope.tab === tabNum;
  };

  //// ===================== chart stuff ===========================
  function getRandomColor() {

  }
  
  $scope.barLabels = ["dank sesh", "chalice palace", "toker heaven", "sativa-sesh", "smoke break", "cali-greens", "tacos and titties"];
  $scope.barData = [
    [65, 59, 80, 57, 96, 58, 85],
  ];

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
    console.log(deltaContents);
    localStorage.setItem('deltaContents', JSON.stringify(deltaContents));
  }

  function getQuillDelta() {
    var deltaContents = JSON.parse(localStorage.getItem('deltaContents'));
    return deltaContents;
  }

  $scope.editorCreated = function (editor) {
      console.log(editor);
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

}]);
