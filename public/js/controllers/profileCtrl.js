app.controller('profileCtrl',['userService','$scope','$window','$rootScope', function(userService, $scope, $window, $rootScope){
	 function userPrep() {
		 console.log("user request", $rootScope.currentUser);
  userService.getUserByName($rootScope.currentUser).then(function(result){
    console.log("user details: ",result);
    $scope.userProfile = result;    
  }, function(err){
    throw (err)
  })//GET request route
	 }
  this.$onInit = () => {
    initTabs();
    userPrep(); 
  }
  $scope.submit = function(){ //function to call on form submit
              //TODO: check if from is valid
              //TODO: Now I check if the image file has been changed.              
              console.log("submit pic is",document.getElementById('fileItem').files[0] );
              var submitPic = document.getElementById('fileItem').files[0];
              console.log("in submit! uploading...", submitPic);
              if (submitPic) {
                Upload.upload({ //'https://danktickets.herokuapp.com/events/deleteAndUpload' 'http://localhost:8000/events/deleteAndUpload'
                    url: 'https://danktickets.herokuapp.com/users/deleteAndUpload', //exposed to upload the file
                    data: {
                     file: submitPic,
                     user: $scope.user
                  } //pass file as data, should be user ng-model
                }).then(function (resp) { //upload function returns a promise
                    if(resp.data.error_code === 0){ //validate success
                      //console.log("controller response is", resp);
                      console.log("response file object", resp.config.data.file);
                        console.log("updated successfully!, redirect");
                        $scope.showRedirect = true;
                        $timeout(function() {
                          $location.path('/');
                        }, 2000);
                      // call a function to submit the whole event
                    } else {
                        $window.alert('an error occured');
                        console.log("rsponse data", resp.data);
                    }
                }, function (resp) { //catch error
                    console.log('Error status: ' + resp.status);
                    $window.alert('Error status: ' + resp.status);
                });
              } else {
                console.log("added event would be", $scope.event);
                createService.updateEvent($scope.event).then(function(res){
                  console.log("update event successfully!");
                  $scope.showRedirect = true;
                  $timeout(function() {
                    $location.path('/');
                  }, 2000);
                }, function(err){
                  console.log("controller error promise");
                  console.error(err);
                });
              }//else just update the event
        }//sumbit

  
  //// ===================== tabs stuff ===========================
  function initTabs() {
    $scope.tab = 0;    
    $scope.profileTabs = ['Account Info', 'Password Reset', 'Email Preferences', 'Close Account'];
  }

  $scope.setTab = function(newTab){
    $scope.tab = newTab;
  };

  $scope.isSet = function(tabNum){
    return $scope.tab === tabNum;
  };

  
}]);
