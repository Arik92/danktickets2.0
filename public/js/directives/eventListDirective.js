app.directive('eventListDirective', function($compile) {
  return {
      restrict: 'E',
      scope: {
          myevents: "=",
          mylimit: "=",
          eventsheader: "="
      },
      controller: ($scope) => {
        console.log('yo from event list directive');
        console.log('mylimit is', $scope.mylimit);
        console.log('myevents are', $scope.myevents);
      },
      templateUrl:'eventListDirective.html',
      replace: true
  }
});