console.log('testing user service');

app.factory('userService', function($http){
  userFactory = {};

  //userService.create(regData);
  userFactory.create = function(regData) {
    return $http.post('/users/users', regData);
  };

  return userFactory;
});
