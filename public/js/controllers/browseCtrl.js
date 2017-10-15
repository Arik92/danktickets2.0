app.controller('browseCtrl',['createService','$scope','$window', function(createService, $scope, $window){
  createService.getEvents().then(function(result){
    console.log("All events: ",result);
    $scope.events = result;
    for (var i=0;i<$scope.events.length;i++) {
      $scope.events[i].imgPath ='/img/uploads/' + $scope.events[i].image;
      console.log("path is", $scope.events[i].imgPath);
    }//for
  }, function(err){
    throw (err)
  })//GET request route
}]);
