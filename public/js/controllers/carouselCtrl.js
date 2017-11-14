app.controller('carouselCtrl',['$scope','$window', function( $scope, $window){
  
  this.$onInit = () => {
    console.log('yooo man from carouselCtrl');
    this.slickSettings();
  }

  this.slickSettings = () => {
    console.log('yo man we slickk');
  }

 /*  $scope.images = [
    "http://vasyabigi.github.io/angular-slick/images/lazyfonz1.png",
    "http://vasyabigi.github.io/angular-slick/images/lazyfonz2.png",
    "http://vasyabigi.github.io/angular-slick/images/lazyfonz3.png",
    ]; */

  $scope.images = [
    "../../img/banner-carousel/medium-weed.jpeg",
    "../../img/banner-carousel/concert1.jpeg",
    "../../img/banner-carousel/cookout-2.jpeg"
    ];


}]);