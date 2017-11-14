app.factory('orService', function($http){
  var getOrganizersByUser = function(userName) {
    return $http.get('/organizers/'+userName).then(function(result) {
      console.log("result from organizer service service: ");
      console.log(result.data);
      return result.data;
    }, function(error) {
      console.error(error);
      // throw (error);
    }) // add promise
  } // get all organizer profiles for a given user id
  var getAllOrganizers = function() {
    return $http.get('/organizers')
      .then(function(response) {
        return response.data;
      }, function(err) {
        console.error(err);
      });
  }// getting events by a certain publisher
  var postOrganizer = function(organizer) {
  return $http.post('/organizers', organizer).then(function(result) {
    console.log("save profile result");
    return result.data;
  }, function(error) {
    console.error(error);
    throw (error);
  }) // add promise
  }// post event
  var updateOrganizer = function(organizer) {
    return $http.put('/organizers/' + organizer._id, organizer).then(function(result) {
      return result.data;
    }, function(error) {
      throw error;
    })//cb
  }//update func
  var deleteOrganizer = function(id) {
    return $http.delete('/organizers/' + id).then(function(result) {
      console.log("organizer profile that was deleted: ", result);
      return result.data; //??
    }, function(error) {
      throw (error);
    }) //promise callbacks
  } // delete organizer profile
      return {
        getAllOrganizers: getAllOrganizers,
        getOrganizersByUser: getOrganizersByUser,
        postOrganizer: postOrganizer,
        updateOrganizer: updateOrganizer,
        deleteOrganizer: deleteOrganizer
    };
});
