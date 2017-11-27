app.controller('regCtrl', function(userService, authService, $http, $location, $timeout) {

  var app = this;

  this.regUser = function (regData) {
    app.loading = true;
    app.errorMsg = false;

    userService.create(app.regData).then(function(data) {
		console.log("data for signup", data.config.data);
		var loginObj = {
			//"username": data.config.data.username,
			"password": data.config.data.password,
			"email": data.config.data.email
		};
      if (data.data.success) {
        app.loading = false;
        //create success message
        //redirect to home page

        // strike here for mailer

        app.successMsg = data.data.message + ' ...Redirecting';
		authService.login(loginObj).then(function(result){
			$timeout(function() {			
          $location.path('/');
        }, 2000);
		});        
      } else {
        app.loading = false;
        //create error message
        app.errorMsg = data.data.message;
      }
    });
  };
});

// app.controller('indexCtrl', function($scope, $rootScope, $http) {
//   $scope.logout = function() {
//     console.log("logging out...");
//     localStorage.removeItem("user");
//     $rootScope.currentUser = null;
//     delete $http.defaults.headers.common.Authorization;
//   }
//})

//// ===================== nodeMailer stuff ===========================


