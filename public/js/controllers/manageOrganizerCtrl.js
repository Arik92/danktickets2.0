app.controller('manageOrganizerCtrl', ['orService', '$scope', '$rootScope', function (orService, $scope, $rootScope) {

  // console.log("root scope usr", $rootScope.currentUser);

  this.$onInit = () => {
    checkUser();
    initTabs();
    initSocialForms();
    organizerPrep();
  }

  function checkUser() {
    $scope.isUserSignedIn = $rootScope.currentUser;
  }

  function organizerPrep() {
    orService.getOrganizersByUser($rootScope.currentUser).then(function (result) {
      console.log("All profiles by ", $rootScope.currentUser, result);
      $scope.profiles = result;
      $scope.profiles.push({ name: '──────────', disabled: true })
      $scope.profiles.push({ name: 'Create New Organizer' })
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

  $scope.selectedItemChanged = function (selectedOrganizer) {
    if (selectedOrganizer.name === 'Create New Organizer') {
      console.log('creating new organizer');
      return;
    }
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
