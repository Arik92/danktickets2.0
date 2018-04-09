app.factory('userService', ['$http', function($http){
  userFactory = {};

  //userService.create(regData);
  userFactory.create = function(regData) {
    return $http.post('/users/users', regData);
  };

  userFactory.getUserByName = function(userName) {
    return $http.get('/users/searchByName/'+userName).then(function(result){
      //console.log("result from the factory is", result);
      return result.data;
    });
  };//getting users details via ID
  
  userFactory.getUserTickets = function(userId) {
	return $http.get('/tickets/userTickets/'+userId).then(function(result){
      //console.log("result from the factory is", result);
      return result.data;
    });//cb 
  }// get a user's purchased tickets 
  return userFactory;
}]);
