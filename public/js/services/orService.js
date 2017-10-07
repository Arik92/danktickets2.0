app.factory('orService', function($http){
  function postEvent() {
  return $http.post('/event').then(function(result) {
    console.log("photo saved and set!");
    console.log(result.data);
    return result.data;
  }, function(error) {
    throw (error);
  }) // add promise
}// post event
  return {
    postOrganizer: postOrganizer
  };
});
