app.factory('timeService', [function () {
  timeService = {};

 timeService.msToDate = function(ms) {
   const newDate = moment(ms).format("ddd, MMM Do, hA");
   return newDate;
 }

  return timeService;
}]);