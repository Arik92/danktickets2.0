app.controller('homeCtrl', ['createService', '$rootScope', '$scope', '$http', '$window', '$location', function (createService, $rootScope, $scope, $http, $window, $location) {

  this.$onInit = () => {
    homeEventsPrep();
    console.log("hello from hoe ctrl");
  }

  $scope.isActive = function (route) {
    return route === $location.path();
  }

  function homeEventsPrep() {
    createService.getEvents().then(function (result) {
      console.log("All events: ", result);
      $scope.events = result;
    }, function (err) {
      throw (err)
    })//GET request route
  }

  $scope.logout = function () {
    console.log("logging out...");
    localStorage.removeItem("user");
    $rootScope.currentUser = null;
    delete $http.defaults.headers.common.Authorization;
  }

}]);
