app.controller('navToggleCtrl',['$scope','$log', '$state', function( $scope, $log, $state){
  
  this.$onInit = () => {
    console.log('yooo man from navToggle');
    this.dropdown();
  }

  this.dropdown = () => {
    console.log('yo man we about to dropdown');
  }

  $scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  $scope.goToState = function(state) {
    console.log('hi from state function');
    $state.go(state);
  }

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    // $event.preventDefault();
    // $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };


}]);