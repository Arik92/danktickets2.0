app.controller('footerCtrl', ['linkService', '$scope', function (linkService, $scope,) {
  

    this.$onInit = () => {
      console.log("hello from footer ctrl");
      $scope.socialLinks = linkService.socialLinks;
      $scope.footerLinks = linkService.footerLinks;
      console.log($scope.socialLinks);
    }


  
  }]);
  