app.controller('manageCtrl',['createService','$scope','$rootScope', function(createService, $scope, $rootScope){
  console.log("root scope usr", $rootScope.currentUser);
  createService.getEventsByOwner($rootScope.currentUser).then(function(result){
    console.log("All events by "+$rootScope.currentUser);
	console.log(result);
    $scope.events = result;
    /*for (var i=0;i<$scope.events.length;i++) {
      console.log($scope.events[i]);
      $scope.events[i].imgPath ='/img/uploads/' + $scope.events[i].image;
      console.log("location "+i+" :", $scope.events[i].location);
    }//for */
  }, function(err){
    throw (err)
  })//GET request route
}]);
