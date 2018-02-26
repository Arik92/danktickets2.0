app.controller('publicProfileCtrl', ['orService', '$scope','$stateParams', function (orService, $scope, $stateParams) {
	function startSocials() {
		$scope.socialLinks = [
    { platform: "instagram", url: $scope.organizer.instagram, faClass: "fa fa-instagram" },
    { platform: "facebook", url:$scope.organizer.facebook, faClass: "fa fa-facebook" },
    { platform: "snapchat", url:$scope.organizer.snapchat, faClass: "fa fa-snapchat" },
    { platform: "twitter", url:$scope.organizer.twitter, faClass: "fa fa-twitter" }
  ];
	}
	function determineOrganizer() {
		if ($stateParams.orgParam) {
			console.log("organizer from parameter b", $stateParams.orgParam); 
			$scope.organizer = $stateParams.orgParam;
		} else {
			/*orService.getOrganizerByName($stateParams.nameParam).then(function(res){
			console.log("organizer from service b", res); 				
				$scope.organizer = res;
			});*/
		}
	}
    this.$onInit = function() {   
	  determineOrganizer();
      startSocials();      
    }  
  }]);