app.controller('validateCtrl', ['authService', '$scope', '$window', '$stateParams', '$state', '$timeout', '$location',
  function (authService, $scope, $window, $stateParams, $state, $timeout, $location) {

    this.$onInit = function() {
      $scope.params = $stateParams;
      console.log($scope.params);

      this.doValidation();
    }



    this.doValidation = function() {
      authService.validateEmail($scope.params).then((res) => {
        console.log("res after validation", res);
        if (res.data.success) {
          authService.login(res.data.user).then((result) => {
            console.log("result", result);
            $timeout(function() {
              $location.path('/')
            }, 3000);
          })
        }
      })
    }



  }]);