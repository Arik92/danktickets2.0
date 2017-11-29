app.controller('resetCtrl', ['authService', '$scope', '$window', '$stateParams', '$state', '$timeout', '$location',
function (authService, $scope, $window, $stateParams, $state, $timeout, $location) {


  this.resetInfo = {
    // email: '',
    userId: $stateParams.userId,
    password: '',
    pwConfirm: ''
  }

  this.mismatchedPasswords = false;
  this.passwordUpdated = false;
  this.updateFailed = false;

  this.$onInit = () => {
    $scope.params = $stateParams;
    console.log($scope.params);

  }

  this.resetPassword = () => {
    console.log('resetting password');

    // confirm that password input matches
    if (this.resetInfo.password !== this.resetInfo.pwConfirm) {
      this.mismatchedPasswords = true;
      return;
    } else {
      this.mismatchedPasswords = false;
    }

    authService.updatePassword(this.resetInfo).then((res) => {
      console.log("res after update", res);
      if (res.data.success) {

        this.passwordUpdated = true;

        // login
        authService.login(res.data.user).then((result) => {
          console.log("result", result);
          $timeout(() => {
            $location.path('/')
          }, 3000);
        })
      } else {
        this.updateFailed = true;
      }
    })

  } 



}]);