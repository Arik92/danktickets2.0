app.controller('carouselCtrl',['$scope','$window', function( $scope, $window){
  
  this.$onInit = () => {
    console.log('yooo man from carouselCtrl');
  }

  $scope.images = [
    "http://vasyabigi.github.io/angular-slick/images/lazyfonz1.png",
    "http://vasyabigi.github.io/angular-slick/images/lazyfonz2.png",
    "http://vasyabigi.github.io/angular-slick/images/lazyfonz3.png",
    ];


}]);