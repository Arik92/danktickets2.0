app.directive('eventListDirective', [function () {
  return {
    restrict: 'E',
    scope: {
      myevents: "=",
      mylimit: "=",
      myfilter: "="
    },
    controller: ["timeService", "$scope", 
      function (timeService, $scope) {
        $scope.getDate = timeService.msToDate;
      }
    ],
    templateUrl: 'eventListDirective.html',
    replace: true
  }
}]);