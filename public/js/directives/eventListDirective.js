app.directive('eventListDirective', function($compile) {
  return {
      restrict: 'E',
      scope: {
          myevents: "=",
          mylimit: "="
      },
      controller: ($scope) => {
        console.log('yo from event list directive');
      },
      templateUrl:'eventListDirective.html',
      replace: true
  }
});