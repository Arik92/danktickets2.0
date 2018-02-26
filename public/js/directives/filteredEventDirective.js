app.directive('filteredEventDirective', function () {
  return {
    restrict: 'E',
    scope: {
      myevents: "=",
      mylimit: "=",
      myfilter: "="
    },
    controller:  function() {
      console.log('yo from filtered events directive');
    },
    templateUrl: 'filteredEventDirective.html',
    replace: true
  }
});