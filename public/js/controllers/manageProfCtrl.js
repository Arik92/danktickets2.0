app.controller('manageProfCtrl',['orService','$scope','$rootScope', function(orService, $scope, $rootScope){
  console.log("root scope usr", $rootScope.currentUser);
  orService.getOrganizersByUser($rootScope.currentUser).then(function(result){
    console.log("All profiles by ",$rootScope.currentUser+":"+result);
    $scope.profiles = result;
    for (var i=0;i<$scope.profiles.length;i++) {
      console.log($scope.profiles[i]);
      $scope.profiles[i].imgPath ='/img/uploads/' + $scope.profiles[i].image;
      //console.log("location "+i+" :", $scope.profiles[i].location);
    }//for
  }, function(err){
    throw (err)
  })//GET request route 
}]);
