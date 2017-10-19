app.controller('manageCtrl',['createService','$scope','$rootScope', function(createService, $scope, $rootScope){
  createService.getEventsByPublisher($rootScope.userDetails.username).then(function(result){
    console.log("All events by: ",$rootScope.userDetails.username);
    $scope.events = result;
    for (var i=0;i<$scope.events.length;i++) {
      $scope.events[i].imgPath ='/img/uploads/' + $scope.events[i].image;
      console.log("location "+i+" :", $scope.events[i].location);
    }//for
  }, function(err){
    throw (err)
  })//GET request route
}]);
