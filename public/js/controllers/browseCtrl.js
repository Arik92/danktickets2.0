app.controller('browseCtrl',['createService','$scope','$window', function(createService, $scope, $window){
  createService.getEvents().then(function(result){
    console.log("All events: ",result);
    $scope.events = result;
  }, function(err){
    throw (err)
  })//GET request route
}]);
