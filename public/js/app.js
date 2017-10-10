var app = angular.module('dankTickets', ['ui.router', 'ngFileUpload']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
   $urlRouterProvider.otherwise('/home');
  $stateProvider
  .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: function($rootScope, $scope) {
        console.log("in home state");
      } //controller
    })
    .state('event', {
      url: '/event',
      templateUrl: '/templates/event.html',
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
    .state('createorganizer', {
      url: '/createorganizer',
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
          controllerAs: 'register'
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
    .state('/edit', {
      url: '/edit-event/:id',
        params: {eventParam: null},
      templateUrl: '/templates/edit-event.html',
      controller: 'editCtrl'
    })
});


