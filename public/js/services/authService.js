app.factory('authService', function($http, authToken){
  var authFactory = {};

  authFactory.login = function(loginData) {
    return $http.post('/users/authenticate', loginData).then(function(data){
      authToken.setToken(data.data.token);
      return data;
    })
  }

  //authService.isLoggedIn()
  authFactory.isLoggedIn = function() {
    if (authToken.getToken()) {
      return true;
    } else {
      return false;
    }
  };
  //authService.logout()
  authFactory.logout = function() {
    authToken.setToken();
  };

  return authFactory; 
})

app.factory('authToken', function($window) {
  var authTokenFactory = {};
  //authToken.setToken(token)
  authTokenFactory.setToken = function(token) {
    if (token) {
      $window.localStorage.setItem('token', token);
    } else {
      $window.localStorage.removeItem('token');
    }
  };
  //authToken.getToken()
  authTokenFactory.getToken = function() {
    return $window.localStorage.getItem('token');
  };
  return authTokenFactory;
})