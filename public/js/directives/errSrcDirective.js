angular.module('errSrcModule', [])
.directive('errSrc', [function () {
  return {
    link: function (scope, element, attrs) {
      console.log('link function ran');
      element.bind('error', function () {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
}]);