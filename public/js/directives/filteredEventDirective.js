app.directive('filteredEventDirective', function ($compile) {
  return {
    restrict: 'E',
    scope: {
      myevents: "=",
      mylimit: "=",
      myfilter: "="
    },
    controller: ($scope) => {
      console.log('yo from filtered events directive');
    },
    templateUrl: 'filteredEventDirective.html',
    replace: true
  }
});