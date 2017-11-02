
app.controller('loginCtrl', function(authService, $timeout, $location, $rootScope) {
  var msg = this;

  msg.loader = false;
  //video part 8 35:22 https://www.youtube.com/watch?v=fRPwKuIz8Os&t=1114s
  $rootScope.$on('fbLogin', function() {
    console.log("I have reached fblogin event, and rootscope current fb user is", $rootScope.currentUser);
    if ($rootScope.currentUser) {
        msg.username =$rootScope.currentUser;
      }
      console.log("login.username", msg.username);
  });

  $rootScope.$on('$locationChangeStart', function() {
    console.log("I have reached logincrtl, and rootscope current fb user is", $rootScope.currentUser);
    if (authService.isLoggedIn()) {
      authService.getUser().then(function(data) {

        msg.username = data.data.username;
        msg.email = data.data.email;
        msg.loader = true;
        msg.id = data.data.id;
        //console.log('you are now logged in! msg is ', app);
        //just to be sure
        $rootScope.userDetails = {};
        $rootScope.userDetails.username = data.data.username;
        $rootScope.userDetails.email = data.data.email;
        $rootScope.userDetails.id = data.data.id;
      });
     }
    //  else  if ($rootScope.currentUser){
    //   msg.username = $rootScope.currentUser;
    // }
     else {
       if (!$rootScope.currentUser) {
         console.log("resetting");
        msg.username = '';
        msg.loader = true;
      } else {
        msg.username =$rootScope.currentUser;
        msg.loader = true;
      }

    }  //else
  });


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
          msg.loginData = '';
          msg.successMsg = false;
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
