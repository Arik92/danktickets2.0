app.controller('carouselCtrl',['$scope','$window', function( $scope, $window){
  
  this.$onInit = function() { 

  }

  $scope.slides = [
    {
      imgURL: "../../img/banner-carousel/taco-sesh-square.jpg",
      bgColor: 'linear-gradient(#1eb089 0%, #7c49ab 100%, #7db9e8 100%)',
      name: 'Taco Seshhh',
      date: 'Friday, January 26, 7:00 PM',
      location: 'Sherman Oaks, CA'
    },
    {
      imgURL: "../../img/banner-carousel/Chalice.jpg",
      bgColor: 'linear-gradient(#1eb089 0%, #7c49ab 100%, #7db9e8 100%)',
      name: 'Sippin magic from a Chalice',
      date: 'Friday, January 26, 7:00 PM',
      location: 'Santa Cruz, CA'
    },
    {
      imgURL: "../../img/banner-carousel/meet-art-sesh.jpg",
      bgColor: 'linear-gradient(red 0%, #7c49ab 100%, #7db9e8 100%)',
      name: 'Meet Art Sesh',
      date: 'Friday, January 26, 7:00 PM',
      location: 'Long Beach, CA'
    },
    {
      imgURL: "../../img/banner-carousel/805-oiler-sesh.jpg",
      bgColor: 'linear-gradient(blue 0%, #7c49ab 100%, #7db9e8 100%)',
      name: 'Food bitch',
      date: 'Friday, January 26, 7:00 PM',
      location: 'Oakland, CA'
    }
    ];


}]);