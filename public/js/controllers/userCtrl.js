app.controller('regCtrl', function($http) {
  this.regUser = function (regData) {
    console.log('form submitted');
    $http.post('/users/users', this.regData).then(function(data) {
      console.log(data);
    });
  };
});

