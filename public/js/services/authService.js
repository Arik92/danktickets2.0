app.factory('authService', function($http, authToken){
  var authFactory = {};

  authFactory.login = function(loginData) {
	  console.log("login data service is", loginData);
    return $http.post('/users/authenticate', loginData).then(function(data){
      authToken.setToken(data.data.token);
      console.log('authServiceCB');
      return data;
    }, errorCallBack)
  }

  authFactory.validateEmail = function(params) {
    return $http.post('/users/emailValidate', params).then(function(res){
      authToken.setToken(res.data.token);
      console.log('validateCB');
      return res;
    }, errorCallBack)
  }

  authFactory.forgotPassword = function(userData) {
    return $http.post('/users/forgotPassword', userData).then(function(res){
      console.log('forgot password res', res);
      return res;
    }, errorCallBack)
  }

  //authService.isLoggedIn()
  authFactory.isLoggedIn = function() {
    console.log('hello from isLoggedIn authFactory');
    if (authToken.getToken()) {
      return true;
    } else {
      return false;
    }
  };

  //authService.getUser();
  authFactory.getUser = function() {
    if (authToken.getToken()) {
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
    if (token) config.headers['x-access-token'] = token;
    return config;
  }
  return authServiceInterceptors;
})

function errorCallBack(err) {
  console.log(err);
}