var app = angular.module('dankTickets', ['ui.router', 'ngFileUpload', 'slick', 'ui.bootstrap', 'ngAnimate', 'cmelo.angularSticky', 'ngMap', 'angularLoad', 'angularSlideables', 'angular-err-src', 'ngImgCrop']);


app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authServiceInterceptors');
})

app.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/templates/home.html',
      controller: 'homeCtrl'
    })
    .state('home.local', {
      url: "/local",
      templateUrl: './templates/home-mobile/home.local.html',
      controller: 'homeCtrl'
    })
    .state('home.upcoming', {
      url: "/upcoming",
      templateUrl: './templates/home-mobile/home.upcoming.html',
      controller: 'homeCtrl'
    })
    .state('home.favorites', {
      url: "/favorites",
      templateUrl: './templates/home-mobile/home.favorites.html',
      controller: function($scope) {
        console.log('hello from the partial');
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('home.home', {
      url: "/list",
      template: "<h1>yoooo we backkk</yo>",
      controller: 'homeCtrl'
    })
    .state('event', {
      url: '/event/:id',
      templateUrl: '/templates/event.html',
      controller: 'eventCtrl'
    })
    .state('search', {
      url: '/search/:string',
      templateUrl: '/templates/search-results.html',
      controller: 'searchCtrl'
    })
	 .state('ticket-cart', {
      url: '/cart',
      templateUrl: '/templates/ticket-cart.html',
      controller: 'ticketCtrl'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: '/templates/profile.html',
	  controller: 'profileCtrl'
    })
    .state('aboutus', {
      url: '/about',
      templateUrl: '/templates/about-us.html'
    })
    .state('create', {
      url: '/create-event',
      templateUrl: '/templates/create-event.html',
      controller: 'createCtrl',
      onEnter: function ($location, $stateParams, $anchorScroll, $timeout) {
        $timeout(function () {
          $location.hash($stateParams.scrollTo);
          $anchorScroll()
        }, 100)
      }
    })
    .state('organizer', {
      url: '/create-organizer',
      templateUrl: '/templates/create-organizer.html',
      controller: 'orCtrl',
      onEnter: function ($location, $stateParams, $anchorScroll, $timeout) {
        $timeout(function () {
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
    .state('validate', {
      url: '/validate/:userId',
      templateUrl: '/templates/validated-landing.html',
      controller: 'validateCtrl'
      // ,controllerAs: 'val'
    })
    .state('forgotPassword', {
      url: '/forgot-password/:userId',
      templateUrl: '/templates/forgot-password.html',
      controller: 'resetCtrl',
      controllerAs: 'resetCtrl'
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
      templateUrl: '/templates/browse-events.html',
      controller: 'browseCtrl'
    })
    .state('manage', {
      url: '/manage-events',
      templateUrl: '/templates/manage-events.html',
      controller: 'manageCtrl'
    })
    .state('blog', {
      url: '/blog',
      templateUrl: '/templates/blog.html'
    })
    .state('event2', {
      url: '/event2',
      templateUrl: '/templates/event2.html'
    })
    .state('userprofiles', {
      url: '/manage-organizers',
      templateUrl: '/templates/manage-organizers.html',
      controller: 'manageOrganizerCtrl'
    })
    .state('edit', {
      url: '/edit-event/:id',
      templateUrl: '/templates/edit-event.html',
      controller: 'editCtrl'
    })
    .state('editprofile', {
      url: '/edit-profile/:id',
      templateUrl: '/templates/edit-organizer.html',
      controller: 'editProfileCtrl'
    })
    .state('auth', {
      url: '/authorization?token&id',
      controller: function ($stateParams, $state, $rootScope, $http) {
        console.log("state params are", $stateParams);
        if ($stateParams.token) {
          var user = {
            id: $stateParams.id,
            token: $stateParams.token
          }
          localStorage.setItem("user", JSON.stringify(user));
          $rootScope.currentUser = user.id;		  
          console.log('rootscope currentUser', $rootScope.currentUser);		 
          //$rootScope.$broadcast('fbLogin');
          $http.defaults.headers.common.Authorization = 'Bearer ' + user.token;
          $state.go('home');
        }
      }//controller
    })
});
app.run(function ($rootScope, authService) {
  var user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    $rootScope.currentUser = user.id;
    console.log('user is: ', user);
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
