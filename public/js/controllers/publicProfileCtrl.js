app.controller('publicProfileCtrl', ['orService', '$scope', function (orService, $scope) {
	function startSocials() {
		$scope.socialLinks = [
    { platform: "instagram", url:"#", faClass: "fa fa-instagram" },
    { platform: "facebook", url:"#", faClass: "fa fa-facebook" },
    { platform: "snapchat", url:"#", faClass: "fa fa-snapchat" },
    { platform: "twitter", url:"#", faClass: "fa fa-twitter" }
  ];
	}
    this.$onInit = function() {     
      startSocials();      
    }  
  }]);