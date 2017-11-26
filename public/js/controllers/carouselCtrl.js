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

  $scope.slides = [
    {
      imgURL: "../../img/banner-carousel/medium-weed.jpeg",
      bgColor: 'linear-gradient(#1eb089 0%, #7c49ab 100%, #7db9e8 100%);'
    },
    {
      imgURL: "../../img/banner-carousel/concert1.jpeg",
      bgColor: 'linear-gradient(red 0%, #7c49ab 100%, #7db9e8 100%);'
    },
    {
      imgURL: "../../img/banner-carousel/cookout-2.jpeg",
      bgColor: 'linear-gradient(blue 0%, #7c49ab 100%, #7db9e8 100%);'
    }
    ];


}]);