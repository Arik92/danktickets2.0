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
    .state('createevent', {
      url: '/createevent',
      templateUrl: '/templates/createEvent.html',
      controller: 'createCtrl',
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
      url: '/termsofservice',
      templateUrl: '/templates/terms.html'
    })
});
