app.factory('purchaseService', function($http){
  purchaseFactory = {};
  purchaseFactory.buyCart = function(dankcart, id){
	  return $http.put('/events/buyTicket/'+id, dankCart).then(function(result){
		  return result.data;
	  }, function(error){
		 throw (error); 
	  })//error route 
  }//buyCart
  
  return purchaseFactory;
});
