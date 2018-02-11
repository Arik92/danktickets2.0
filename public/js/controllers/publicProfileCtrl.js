app.controller('publicProfileCtrl', ['orService', '$scope', '$window', '$stateParams', '$state', '$timeout', '$location',
  function (orService, $scope, $window, $stateParams, $state, $timeout, $location) {

    this.$onInit = () => {
      $scope.params = $stateParams;
      console.log($scope.params);

      this.doValidation();
    }



    this.doValidation = () => {
      authService.validateEmail($scope.params).then((res) => {
        console.log("res after validation", res);
        if (res.data.success) {
          authService.login(res.data.user).then((result) => {
            console.log("result", result);
            $timeout(() => {
              $location.path('/')
            }, 3000);
          })
        }
      })
    }



  }]);