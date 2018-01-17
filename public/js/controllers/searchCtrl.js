app.controller('searchCtrl', ['$scope', '$window', 'createService', '$stateParams', function ($scope, $window, createService, $stateParams) {

  this.$onInit = () => {
	  console.log("searching for", $stateParams.string);
    console.log('yo from searchCtrl');
    $scope.dummyEvents = createService.dummyEvents;	
    console.log($scope.dummyEvents);

    createService.generalSearch($stateParams.string).then(function (result) {
		console.log("search result", result);
	$scope.events = result;
    });// CB
  }//onInit

}]);