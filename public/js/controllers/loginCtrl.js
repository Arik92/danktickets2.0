app.controller('loginCtrl', function(authService, $timeout, $location, $scope, $window) {
  var app = this;

  app.loader = false;
  //video part 8 35:22 https://www.youtube.com/watch?v=fRPwKuIz8Os&t=1114s
  $scope.$on('$locationChangeStart', function() {
    if (authService.isLoggedIn()) {
      app.isLoggedIn = true;
      authService.getUser().then(function(data) {
        app.username = data.data.username;
        app.email = data.data.email;
        app.loader = true;
        console.log('you are now logged in! msg is ', app);
      });
    } else {
      app.isLoggedIn = false;
      app.username = '';
      app.loader = true;
    }
    if ($location.hash() == '_=_') $location.hash(null);
  });

  this.facebook = function() {
    // app.disabled = true;
    $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/facebook';
  };

  this.doLogin = function (loginData) {
    app.loading = true;
    app.errorMsg = false;

    authService.login(app.loginData).then(function(data) {
      if (data.data.success) {
        app.loading = false;
        //create success message
        //redirect to home page
        app.successMsg = data.data.message + ' ...Redirecting';
        $timeout(function() {
          $location.path('/');
          app.loginData = '';
          app.successMsg = false;
        }, 2000);
      }  else {
        app.loading = false;
        //create error message
        app.errorMsg = data.data.message;
      }
    });
  };
  this.logout = function() {
    authService.logout();
    $location.path('/');
  }
});
