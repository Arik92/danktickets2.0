app.controller('regCtrl', function(userService, $http, $location, $timeout) {

  var app = this;

  this.regUser = function (regData) {
    app.loading = true;
    app.errorMsg = false;
    
    userService.create(app.regData).then(function(data) {
      if (data.data.success) {
        app.loading = false;
        //create success message
        //redirect to home page
        app.successMsg = data.data.message + ' ...Redirecting';
        $timeout(function() {
          $location.path('/');
        }, 2000);     
      }  else {
        app.loading = false;
        //create error message
        app.errorMsg = data.data.message;
      }
    });
  };
});

app.controller('facebookCtrl', function($stateParams, authService, $location, $window) {
  var app = this;

  if ($window.location.pathname == '/facebookerror') {
      app.errorMsg = 'facebook email not found in database';
  } else {
      console.log($stateParams.token)
      authService.facebook($stateParams.token);
      $location.path('/');
  }
});



