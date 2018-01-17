app.controller('searchCtrl', ['$scope', '$window', 'createService', '$stateParams', function ($scope, $window, createService, $stateParams) {

  this.$onInit = () => {

    console.log('yo from searchCtrl');
    $scope.dummyEvents = createService.dummyEvents;	
    console.log($scope.dummyEvents);


    createService.generalSearch($stateParams.searchString).then(function (result) {

    });// CB
  }//onInit

}]);