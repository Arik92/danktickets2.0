app.controller('loginCtrl', ['authService', 'userService', '$timeout', '$location', '$rootScope', '$scope', function(authService, userService, $timeout, $location, $rootScope, $scope) {
  var msg = this;
  this.resetInfo = {};
  this.resetInfo.email = '';

	this.$onInit = function() {
   //msg.loginData = {};
   $scope.showCreation = false;
   if ($rootScope.currentUser) {
	   userService.getUserByName($rootScope.currentUser).then(function(result){
    console.log("user details: ",result);
    $scope.navProfile = result;   
	/*if ($scope.navProfile.profiles)	{
		$scope.
	}//if  */
  }, function(err){
    throw (err)
  })//GET request route
   }//if 
 }//onInit 

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
		console.log("data ", data);
        msg.username = data.data.username;
        msg.email = data.data.email;
        msg.loader = true;
		msg.picture = data.data.picture;
        msg.id = data.data.id;
        console.log('you are now logged in! msg is ', app);
        //just to be sure
        $rootScope.userDetails = {};
		console.log("data ", data.data);
        $rootScope.currentUser = data.data.username; // for fb auth as well
        $rootScope.userDetails.username = data.data.username;
        $rootScope.userDetails.email = data.data.email;
        $rootScope.userDetails.id = data.data.id;
		$rootScope.userDetails.picture = data.data.picture;	
		$scope.navProfile = $rootScope.userDetails;
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
		userService.getUserByName($rootScope.currentUser).then(function(result){
    console.log("user details: ",result);
    $scope.navProfile = result;    
  }, function(err){
    throw (err)
  })//GET request route
        msg.loader = true;
      }

    }  //else
  });

  //// ===================== forgot password stuff ===========================
  
  this.sendEmail = function() {
    authService.forgotPassword(this.resetInfo).then(function(res) {
      console.log('authservice res', res);
    })
  }

  //// ===================== normal login ===========================
  
  this.doLogin = function (loginData) {
	  //console.log("login data looks like", loginData);
    msg.loading = true;
    msg.errorMsg = false;
	loginData.email = loginData.email.toLowerCase();
    authService.login(msg.loginData).then(function(data) {
      if (data.data.success) { 
		$rootScope.currentUser = data.data.username
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
    localStorage.removeItem("user");
    $rootScope.currentUser = null;
	$rootScope.userDetails = {};
    // delete $http.defaults.headers.common.Authorization;
    authService.logout();
    $location.path('/');
  }
}]);
