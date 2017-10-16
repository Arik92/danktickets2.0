app.factory('authService', function($http){
  var authFactory = {};

  authFactory.login = function(loginData) {
    return $http.post('/users/authenticate', loginData)
  }

  return authFactory; 
});
