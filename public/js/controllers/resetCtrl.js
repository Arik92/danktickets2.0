app.controller('resetCtrl', ['authService', '$scope', '$window', '$stateParams', '$state', '$timeout', '$location',
function (authService, $scope, $window, $stateParams, $state, $timeout, $location) {


  this.resetInfo = {
    // email: '',
    userId: $stateParams.userId,
    password: '',
    pwConfirm: ''
  }

  this.doPasswordsMatch = true;
  this.passwordUpdated = false;
  this.updateFailed = false;

  this.$onInit = function() {
    $scope.params = $stateParams;
    console.log($scope.params);

  }

  this.resetPassword = function() {

    // check that password confirmation matches
    // this.doPasswordsMatch = this.comparePasswords(this.resetInfo.password, this.resetInfo.pwConfirm);
    this.doPasswordsMatch = this.comparePasswords(this.resetInfo.password, this.resetInfo.pwConfirm);

    if (!this.doPasswordsMatch) return;

    authService.updatePassword(this.resetInfo).then((res) => {
      console.log("res after update", res);
      if (res.data.success) {

        this.passwordUpdated = true;

        // login
        authService.login(res.data.user).then((result) => {
          console.log("result", result);
          $timeout(function() {
            $location.path('/')
          }, 3000);
        })
      } else {
        this.updateFailed = true;
      }
    })
  } 

this.comparePasswords = (pw1, pw2) => {
  return pw1 === pw2 ? true : false;
}

}]);