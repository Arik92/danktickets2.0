app.controller('manageCtrl',['createService','$scope','$rootScope', function(createService, $scope, $rootScope){
	var socket = io();

    /*socket.on('connect', function () { 

        person_name = prompt("Welcome. Please enter your name");

        socket.emit('NewPlayer', person_name);

        socket.on('disconnected', function() {

            socket.emit('DelPlayer', person_name);

        });

    });*/
  console.log("root scope usr", $rootScope.currentUser);
  createService.getEventsByOwner($rootScope.currentUser).then(function(result){
    console.log("All events by "+$rootScope.currentUser);
	console.log(result);
    $scope.events = result;
    /*for (var i=0;i<$scope.events.length;i++) {
      console.log($scope.events[i]);
      $scope.events[i].imgPath ='/img/uploads/' + $scope.events[i].image;
      console.log("location "+i+" :", $scope.events[i].location);
    }//for */
  }, function(err){
    throw (err)
  })//GET request route
}]);
