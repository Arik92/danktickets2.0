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

// app.controller('indexCtrl', function($scope, $rootScope, $http) {
//   $scope.logout = function() {
//     console.log("logging out...");
//     localStorage.removeItem("user");
//     $rootScope.currentUser = null;
//     delete $http.defaults.headers.common.Authorization;
//   }
//})
