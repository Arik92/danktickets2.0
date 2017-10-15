app.controller('regCtrl', function(userService, $http, $location, $timeout) {

  var msg = this;

  this.regUser = function (regData) {
    msg.loading = true;
    msg.errorMsg = false;
    $http.post('/users/users', this.regData).then(function(data) {
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
});



