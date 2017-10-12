app.controller('regCtrl', function() {
  this.regUser = function (regData) {
    console.log('form submitted');
    console.log(this.regData);
  };
});