app.controller('homeCtrl', ['createService', 'dankAdService', '$rootScope', '$scope', '$http', '$window', '$location', function (createService, dankAdService, $rootScope, $scope, $http, $window, $location) {

  this.$onInit = () => {
    console.log("hello from hoe ctrl");
    homeEventsPrep();
    $scope.dummyEvents = getDummyEvents();
    $scope.dummyAds = dankAdService.dummyAds;
    console.log($scope.dummyAds);
    $scope.featuredDummyEvent =  {
      imgURL: "../../img/wide-posters/cannabis-cup.png",
      name: 'Cannabis Cup',
      date: 'Friday, January 26, 7:00 PM',
      location: 'Sherman Oaks, CA'
    }
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

  function getDummyEvents() {
    let events = [];
    for (i=0; i<15; i++) {
      events.push({
        name: 'dummy event',
        date: '4/20/2018',
        location: 'Calabasas, NM'
      })
    }
    return events;
  }

}]);
