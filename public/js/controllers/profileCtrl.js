app.controller('profileCtrl',['userService','$scope','$window','$rootScope', function(userService, $scope, $window, $rootScope){
	 function userPrep() {
		 console.log("user request", $rootScope.currentUser);
  userService.getUserByName($rootScope.currentUser).then(function(result){
    console.log("user details: ",result);
    $scope.userProfile = result;
    userService.getUserTickets($rootScope.currentUser).then(function(result){
	  $scope.userTickets = result;
      console.log("found user tickets", $scope.userTickets);
	  }); 
  }, function(err){
    throw (err)
  })//GET request route
	 }
  this.$onInit = function() {
    initTabs();
    userPrep(); 
  }
  $scope.submit = function(){ //function to call on form submit                    
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
            
        }//sumbit

  //// ===================== tabs stuff ===========================
  function initTabs() {
    $scope.tab = 1;    
    $scope.profileTabs = ['Account Info','Purchase History', 'Password Reset', 'Credit/Debit Cards', 'Email Preferences', 'Close Account'];
  }

  $scope.setTab = function(newTab){
    $scope.tab = newTab;
  };

  $scope.isSet = function(tabNum){
    return $scope.tab === tabNum;
  };

  //// ===================== checkboxes ===========================
  
  $scope.eventMailOptions = [
    { title: 'Updates of new Dank Ticket Features', selected: 'true'},
    { title: 'Weekly event guide and recommendations', selected: 'true'},
    { title: 'Requests for additional information', selected: 'true'},
  ]

  $scope.organizerMailOptions = [
    { title: 'Updates about new Dank Ticket features for organizers', selected: 'true'},
    { title: 'Monthly tips for organizing events', selected: 'true'},
    { title: 'Event Sales Recap', selected: 'true'},
  ]

  $scope.clearAll = function(options) {
    options.forEach(function(option) {
      option.selected = false;
    })
  }

  //// ===================== account closing radio stuff ===========================
  
  $scope.accountClosing = [
    { title: 'you guys suck', optionId: 0 },
    { title: 'I quit weed (wtf!?)', optionId: 1 },
    { title: 'You guys are too good, I just need to save money', optionId: 2 },
    { title: 'Other(please explain)', optionId: 3, isOther: true }
  ]

  $scope.closingOption = {
    id: 0
  } 

  $scope.otherClosingOption = "";
  
}]);
