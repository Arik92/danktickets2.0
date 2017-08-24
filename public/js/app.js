//var app = angular.module('beerList', ['ui.router']);
var app = angular.module('dankTickets', ['ui.router','angularFileUpload']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/home');
  $stateProvider
  .state('index', {
      url: '/home',
      templateUrl: '/templates/index.html'
    })
    .state('event', {
      url: '/event',
      templateUrl: '/templates/event.html'
    })
    .state('aboutus', {
      url: '/about',
      templateUrl: '/templates/about-us.html'
    })
    .state('createevent', {
      url: '/createevent',
      templateUrl: '/templates/createEvent.html'
    })
    .state('services', {
      url: '/services',
      templateUrl: '/templates/services.html'
    })
    .state('page-contact', {
      url: '/page-contact',
      templateUrl: '/templates/page-contact.html'
    })
});
