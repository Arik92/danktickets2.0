app.factory('purchaseService', function($http){
  purchaseFactory = {};
  purchaseFactory.buyCart = function(dankcart, id){
	  return $http.put('/events/buyTicket/'+id, dankCart).then(function(result){
		  return result.data;
	  }, function(error){
		 throw (error); 
	  })//error route 
  }//buyCart
  purchaseFactory.getCart = function(userId) {
	return $http.get('/users/shoppingCart/'+userId).then(function(result){
		console.log("cart from service", result);
		return result.data;
	}, function(error) {
		throw (error);
	});  //$http cb
  };//getCart 
  purchaseFactory.saveCart = function(userId, newCart) {
	return $http.put('/users/shoppingCart/'+userId, newCart).then(function(result){
		console.log("cart from service", result);
		return result.data;
	}, function(error) {
		throw (error);
	});  //$http cb
  };//getCart 
  
  return purchaseFactory;
});
