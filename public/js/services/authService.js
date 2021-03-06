app.factory('authService', ['$http', 'authToken', function($http, authToken){
  var authFactory = {};

  authFactory.login = function(loginData) {
	  console.log("login data service is", loginData);
    return $http.post('/users/authenticate', loginData).then(function(data){
		/*console.log("authservice login token here", data);
		var loginToken = {
			token: data.data.token,
			username: data.data.username			
		}*/
		console.log("token has" , data.data.token);
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

  authFactory.updatePassword = function(userData) {
    return $http.post('/users/updatePassword', userData).then(function(res){
      console.log('forgot password res', res);
      return res;
    }, errorCallBack)
  }

  //authService.isLoggedIn()
  authFactory.isLoggedIn = function() {
    //console.log('hello from isLoggedIn authFactory');
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
}])

app.factory('authToken', ['$window', function($window) {
  var authTokenFactory = {};
  //authToken.setToken(token)
  authTokenFactory.setToken = function(token) {
	  console.log("token has" , token);
    if (token) {
      $window.localStorage.setItem('token', token);	 
          var user = {
            name: token.username,
            token: token,
			id: token.id
          }
          localStorage.setItem("user", JSON.stringify(user));
          //$rootScope.currentUser = user.name;
    } else {
      $window.localStorage.removeItem('token');    
	};//else 
  }//setToken
  //authToken.getToken()
  authTokenFactory.getToken = function() {
    return $window.localStorage.getItem('token');
  };
  return authTokenFactory;
}])

app.factory('authServiceInterceptors', ['authToken', function(authToken) {
  var authServiceInterceptors = {};
  authServiceInterceptors.request = function(config) {
    var token = authToken.getToken();
    if (token) config.headers['x-access-token'] = token;
    return config;
  }
  return authServiceInterceptors;
}])

function errorCallBack(err) {
  console.log(err);
}