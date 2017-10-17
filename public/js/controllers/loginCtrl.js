app.controller('loginCtrl', function(authService, $timeout, $location) {
  var msg = this;

  if (authService.isLoggedIn()) {
    console.log('success user is logged in');
  } else {
    console.log('failure user is not logged in');
  }

  this.doLogin = function (loginData) {
    msg.loading = true;
    msg.errorMsg = false;
    authService.login(msg.loginData).then(function(data) {
      if (data.data.success) {
        msg.loading = false;
        //create success message
        //redirect to home page
        msg.successMsg = data.data.message + ' ...Redirecting';
        $timeout(function() {
          $location.path('/');
        }, 2000);     
      }  else {
        msg.loading = false;
        //create error message
        msg.errorMsg = data.data.message;
      }
    });
  };
  this.logout = function() {
    authService.logout();
    $location.path('/');
  }
}); 

