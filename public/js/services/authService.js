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

  //authService.facebook(token);
  authFactory.facebook = function(token) {
    authToken.setToken(token);
  };

  //authService.getUser();
  authFactory.getUser = function() {
    if (authToken.getToken) {
      return $http.post('/users/currentUser');
    } else {
      $q.reject({ message: 'User has no token' });
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

app.factory('authServiceInterceptors', function(authToken) {
  var authServiceInterceptors = {};
  authServiceInterceptors.request = function(config) {
    var token = authToken.getToken();
    console.log(token);
    if (token) config.headers['x-access-token'] = token;
    return config;
  }
  return authServiceInterceptors;
})