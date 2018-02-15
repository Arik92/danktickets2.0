app.controller('navToggleCtrl', ['$scope', function( $scope){
  
  this.$onInit = function() {
    $scope.isOpen = false;
  }

  $scope.toggleDropDown = function() {
    $scope.isOpen = !$scope.isOpen;
  }

}]);