var app = angular.module('dankTickets', ['ui.router', 'ngFileUpload', 'slick']);

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('authServiceInterceptors');
})

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
   $urlRouterProvider.otherwise('/home');
  $stateProvider
  .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: function($rootScope, $scope, $http) {
        $scope.logout = function() {
          console.log("logging out...");
      localStorage.removeItem("user");
      $rootScope.currentUser = null;
      delete $http.defaults.headers.common.Authorization;
    }
      } //controller
    })
    .state('event', {
      url: '/event',
      templateUrl: '/templates/event.html',
    })
    .state('profile', {
      url: '/profile',
      templateUrl: '/templates/profile.html',
    })
    .state('aboutus', {
      url: '/about',
      templateUrl: '/templates/about-us.html'
    })
    .state('create', {
      url: '/create-event',
      templateUrl: '/templates/createEvent.html',
      controller: 'createCtrl',
      onEnter: function ($location, $stateParams, $anchorScroll, $timeout) {
        $timeout(function() {
          $location.hash($stateParams.scrollTo);
          $anchorScroll()
        }, 100)
      }
    })
    .state('organizer', {
      url: '/create-organizer',
      templateUrl: '/templates/createOrganizer.html',
      controller: 'orCtrl',
      onEnter: function ($location, $stateParams, $anchorScroll, $timeout) {
        $timeout(function() {
          $location.hash($stateParams.scrollTo);
          $anchorScroll()
        }, 100)
      }
    })
    .state('services', {
      url: '/services',
      templateUrl: '/templates/services.html'
    })
    .state('page-contact', {
      url: '/page-contact',
      templateUrl: '/templates/page-contact.html'
    })
    .state('terms', {
          url: '/terms-of-service',
          templateUrl: '/templates/terms.html'
        })
    .state('privacypolicy', {
          url: '/privacy-policy',
          templateUrl: '/templates/privacypolicy.html'
        })
    .state('signup', {
          url: '/sign-up',
          templateUrl: '/templates/signup.html',
          controller: 'regCtrl',
          controllerAs: 'register',
          authenticated: false
        })
    .state('signin', {
          url: '/sign-in',
          templateUrl: '/templates/login.html'
        })
    .state('dashboard', {
          url: '/dashboard',
          templateUrl: '/templates/dashboard.html'
        })
    .state('contact', {
          url: '/contact',
          templateUrl: '/templates/contact.html'
        })
    .state('browse', {
          url: '/browse-events',
          templateUrl: '/templates/browseEvents.html',
          controller: 'browseCtrl'
        })
    .state('manage', {
      url: '/manage-events',
      templateUrl: '/templates/manageEvents.html',
      controller: 'manageCtrl'
    })
    .state('edit', {
      url: '/edit-event/:id',
        params: {eventParam: null},
      templateUrl: '/templates/editEvent.html',
      controller: 'editCtrl'
    })
    .state('auth', {
      url: '/authorization?token&name',
      controller: function($stateParams, $state, $rootScope, $http) {
        console.log("state params are", $stateParams);
        if ($stateParams.token) {
          var user = {
            name: $stateParams.name,
            token: $stateParams.token
          }
          localStorage.setItem("user", JSON.stringify(user));
          $rootScope.currentUser = user.name;
          //$rootScope.$broadcast('fbLogin');
          $http.defaults.headers.common.Authorization = 'Bearer ' + user.token;
          $state.go('home');
        }
      }//controller
    })
});
app.run(function($rootScope, authService) {
  var user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    $rootScope.currentUser = user.name;
    //$rootScope.$broadcast('fbLogin');
  }
  // if (authService.isLoggedIn()) {
  //   authService.getUser().then(function(data) {
  //
  //     $rootScope.username = data.data.username;
  //     $rootScope.email = data.data.email;
  //     $rootScope.loader = true;
  //     $rootScope.id = data.data.id;
  //     //console.log('you are now logged in! msg is ', app);
  //     //just to be sure
  //     $rootScope.userDetails = {};
  //     $rootScope.userDetails.username = data.data.username;
  //     $rootScope.userDetails.email = data.data.email;
  //     $rootScope.userDetails.id = data.data.id;
  //   });
  //  }
  // //  else  if ($rootScope.currentUser){
  // //   msg.username = $rootScope.currentUser;
  // // }
  //  else {
  //   //  console.log("resetting");
  //   // $rootScope.username = '';
  //   // $rootScope.loader = true;
  //
  // }
});
