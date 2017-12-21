app.controller('profileCtrl',['userService','$scope','$window','$rootScope', function(userService, $scope, $window, $rootScope){
	 function userPrep() {
		 console.log("user request", $rootScope.currentUser);
  userService.getUserByName($rootScope.currentUser).then(function(result){
    console.log("user details: ",result);
    $scope.userProfile = result;    
  }, function(err){
    throw (err)
  })//GET request route
	 }
  this.$onInit = () => {
   userPrep(); 
  }
}]);
