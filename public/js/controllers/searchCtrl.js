app.controller('searchlCtrl',['$scope','$window','createService','$stateParams', function( $scope, $window, createService, $stateParams){
  
  this.$onInit = () => { 
	createService.generalSearch($stateParams.searchString).then(function(result){
		
	});// CB
  }//onInit
  
}]);