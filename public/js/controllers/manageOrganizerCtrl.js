app.controller('manageOrganizerCtrl', ['orService','createService','merchService' , '$scope', '$rootScope', function (orService, createService, merchService, $scope, $rootScope) {
  // console.log("root scope usr", $rootScope.currentUser);
  this.$onInit = function() {
    checkUser();
    initTabs();
    initSocialForms();
    organizerPrep();
    // setImageCropStuff();    
  };
  
  $scope.initUploader = function() {
	  cloudinary.openUploadWidget({ cloud_name: 'newoldroad-com',
	  upload_preset: 'organizer_pgznub8n',
	  theme: 'purple',
	  multiple: false,
	  cropping_show_back_button: true,
	  cropping: 'server',
	  cropping_coordinates_mode:'custom',
	  sources: ['local', 'url', 'facebook', 'instagram', 'dropbox']
	  }, 
      function(error, result) { 
	  if (error) {
		  throw (error);
	  } else {
		  console.log(result);
	  }	  
	  // for HTTPS $scope.previewImg = result.secure_url;
	  $scope.previewImg = result[0].url;
	$scope.$apply();	  
	  });
  };//initUploader  

  function checkUser() {
    $scope.isUserSignedIn = $rootScope.currentUser;
  } 

  function organizerPrep() {
    orService.getOrganizersByUser($rootScope.currentUser).then(function (result) {
      console.log("All profiles by ", $rootScope.currentUser, result);
      $scope.profiles = result;
      $scope.selectedOrganizer = result[0];
	  createService.getEventsByOrganizer($scope.selectedOrganizer._id).then(function(result){
		//console.log("organizer's events", result);
		$scope.events = result;
		$scope.ongoingOrgEvents = [];
		$scope.pastOrgEvents = [];
		$scope.selectedStatEvent = {};
		for (var i=0;i<$scope.events.length;i++) {
			if (($scope.events[i].ongoing)&&($scope.ongoingOrgEvents.length<10)) {
				$scope.ongoingOrgEvents.push($scope.events[i]);
			} else if ($scope.pastOrgEvents.length<10) {
				$scope.pastOrgEvents.push($scope.events[i]);
			}//else pushing events to approprate arrays
		}//for 
		/*$scope.selectedCurr = $scope.ongoingOrgEvents[0];
		$scope.selectedPast = $scope.pastOrgEvents[0];
		if ($scope.selectedCurr) {
			$scope.selectedStatEvent = $scope.selectedCurr;
		} else {
			$scope.selectedStatEvent = $scope.selectedPast;
		}//else */
		$scope.setBarData($scope.ongoingOrgEvents);
		console.log("this organizer's current events",$scope.ongoingOrgEvents);
	});
    }, function (err) {
      throw (err);
    });//GET request route 
  }

  function initSocialForms() {
    $scope.socialForms = [
      { name: 'Facebook', model: $scope.fbInput },
      { name: 'Instagram', model: $scope.igInput },
      { name: 'Snapchat', model: $scope.scInput },
      { name: 'Twitter', model: $scope.twitInput },
      { name: 'LinkedIn', model: $scope.liInput },
    ];
  }
  
  $scope.showOrg = function() {
	  console.log("selected organizer", $scope.selectedOrganizer);
  };

  $scope.selectedItemChanged = function (selectedOrganizer) {
    console.log('you picked option:', selectedOrganizer );
	$scope.selectedOrganizer = selectedOrganizer;
	createService.getEventsByOrganizer(selectedOrganizer._id).then(function(result){
		//console.log("organizer's events", result);
		$scope.events = result;
		$scope.ongoingOrgEvents = [];
		$scope.pastOrgEvents = [];		
		for (var i=0;i<$scope.events.length;i++) {
			if (($scope.events[i].ongoing)&&($scope.ongoingOrgEvents.length<10)) {
				$scope.ongoingOrgEvents.push($scope.events[i]);
			} else if ($scope.pastOrgEvents.length<10) {
				$scope.pastOrgEvents.push($scope.events[i]);
			}//else pushing events to approprate arrays
		}//for 
		$scope.setBarData($scope.ongoingOrgEvents);
	});
  };//when organizer changes 
  
  $scope.selectedStatEventChanged = function(evt) {
	  console.log("selected event: ", evt);
	  $scope.selectedStatEvent = evt;
	  setDonutData();
	  setPieData();
  };//when event changes for STATS 
  
   $scope.selectedAttendingEventChanged = function(evt) {
	  createService.getAttendees(evt._id).then(function(result){
		  $scope.tickets = result;
		  console.log("found tickets", $scope.tickets);
	  });
  };//when event changes for STATS 
  //$scope.selectedAttendingEventChanged();

  //// ===================== tabs stuff ===========================
  function initTabs() {
    $scope.tab = 4;
    $scope.organizerTabs = ['Organizer Info', 'Stats', 'Manage Events', 'Merchant profile', 'Check Attendees', 'Organizer Settings'];
  }

  $scope.setTab = function (newTab) {
    $scope.tab = newTab;
  };

  $scope.isSet = function (tabNum) {
    return $scope.tab === tabNum;
  };
  
  //// ===================== chart stuff ===========================  
  $scope.setBarData = function(evts) {
	   $scope.barData = [];
	  $scope.barLabels = [];
	  for (var i=0;i<evts.length;i++) {
		  $scope.barLabels[i] = evts[i].title;
		  $scope.barData[i] = 0;
		  for (var j=0;j<evts[i].eventTickets.length;j++) {
			  $scope.barData[i] +=evts[i].eventTickets[j].ticketsSold*evts[i].eventTickets[j].ticketPrice;
		  }// for event tickets 
	  }//for evts 
	  console.log("bar data", $scope.barData);
  };//set bar data
  setDonutData = function() {
	  $scope.donutData = [];
	  var totalSold = 0;
	  var total = 0;
	  for (var i=0;i<$scope.selectedStatEvent.eventTickets.length;i++) {
		  totalSold+= $scope.selectedStatEvent.eventTickets[i].ticketsSold;
		  total+= $scope.selectedStatEvent.eventTickets[i].ticketQ;
	  }	  
	  $scope.donutData[0] = totalSold;
	  $scope.donutData[1] = total;
  };//setDonutData 
  setPieData = function() {
	  $scope.pieData = [];
	  $scope.pieLabels = [];	  
	  for (var i=0;i<$scope.selectedStatEvent.eventTickets.length;i++) {
		  $scope.pieLabels[i] = $scope.selectedStatEvent.eventTickets[i].ticketType;
		  $scope.pieData[i] = $scope.selectedStatEvent.eventTickets[i].ticketsSold;
	  }	  	  
  };//setDonutData 
  $scope.donutLabels = ["sold", "available"];
  //$scope.barLabels = ["dank sesh", "chalice palace", "toker heaven", "sativa-sesh", "smoke break", "cali-greens", "tacos and titties"];
  /*$scope.barData = [
    [65, 59, 80, 57, 96, 58, 85],
  ];*/

  $scope.barColors = ['', 'orange', 'red', 'green', 'blue', 'lightgrey', ];

  $scope.barClick = function (points, evt) {
    console.log(points, evt);
  };

  //// ===================== manage events(by organizer) ===========================
  
  //// ===================== manage events ===========================
  
  //// ===================== ng-quill stuff ===========================
  $scope.title = '';
  $scope.changeDetected = false;
  $scope.saveQuill = function() {
    var deltaContents = $scope.editor.getContents();
    //console.log(deltaContents);
    localStorage.setItem('deltaContents', JSON.stringify(deltaContents));
  };
  function getQuillDelta() {
    var deltaContents = JSON.parse(localStorage.getItem('deltaContents'));
    return deltaContents;
  }
  $scope.editorCreated = function (editor) {
      //console.log(editor);
      $scope.editor = editor;

      var existingDelta = getQuillDelta();
      if (existingDelta) {
        editor.setContents(existingDelta);
      } else {
        console.log('no previous deltas');
        return;
      }
  };
  $scope.contentChanged = function (editor, html, text, delta, oldDelta) {
      $scope.changeDetected = true;
      console.log($scope.title);
      console.log('editor: ', editor, 'html: ', html, 'text:', text, 'delta:', delta, 'oldDelta:', oldDelta);
  };
  //////////////////////******************************** MERCHANT STUFF *******************************//////////////
  var config = require('../config.js');
  var merchKey = config.MERCHANT_PRIVATE_API_KEY;
  var mcc = config.MERCHANT_MCC;
  //console.log("merchant key is "+merchKey+" and mcc is "+mcc);
  $scope.createMerchant = function() {
	  var mockMerch = {
		  "isNew": "0",
		  "established":"20101020",
		  "annualCCSales": "100000",
		  "mcc": mcc,
		  "status":"1", 
	  };
	  var mockEntity = {
          "name": "Real OG Kush 2",		  
		  "type":"1",
		  "address1": "123 North 12 St",
		  "city": "Miami",
		  "state": "FL",
		  "zip": "33024",
		  "country": "USA", //gonna be USA for all the them. most likely
		  "phone": "1234567891",
		  "email": "support@example.com",
		  "ein": "123456789",
		  "website": "http://www.example.com"
	  };
	  mockEntity.accounts = [];
	  mockEntity.accounts[0] = {
		  "primary": "1",
		  "account": {
		  "method": "8",
		  "number": "023456789012345",
		  "routing": "063013924"
		  }//accouts[].account
	  };
	  var mockMembers = [];
	  mockMembers[0] = {
		  "first": "James",
		  "last": "Smith",
		  "title": "CEO",
		  "dob": "19590122",
		  "ownership": "8000",
		  "email": "james.smith@example.com",
		  "ssn": "123456789",
		  "address1": "123 Example St.",
		  "city": "New York",
		  "state": "NY",
		  "zip": "10001",
		  "country": "USA", //always. See entity country		   
		  "primary": "1"
	  };
            /*-d members[0][dl]="123456789" \ DRIVERS LICENSE
            -d members[0][dlstate]="NY" */
			//console.log("mcc is"+mcc);
	merchService.createMerchant(merchKey, mockEntity, mockMembers, mockMerch).then(function(response){
		  //console.log("merchant controller response is", response.response.data[0]);
		  //console.log("merhcant id is "+response.response.data[0].id);
		  $scope.selectedOrganizer.merchantId = response.response.data[0].id;		  
		  orService.updateOrganizer($scope.selectedOrganizer).then(function(response){
			  console.log("updated organizer object ",response);
		  });
	  });	  
	  /*merchService.createMerchat(key, mcc, $scope.entity, $scope.merchant, $scope.bank, $scope.owner).then(function(response){
		  console.log("merchant controller response is", response);
	  });*/
  };
  //$scope.createMerchant();
}]);