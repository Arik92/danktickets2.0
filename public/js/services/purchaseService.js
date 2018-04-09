app.factory('purchaseService', ['$http', function($http){
  purchaseFactory = {};
  purchaseFactory.addTickets = function(tickets){
	  return $http.post('/tickets/', tickets).then(function(result){
		  return result.data;
	  }, function(error){
		 throw (error); 
	  })//error route 
  }//buyCart
  purchaseFactory.checkIn = function(ticketId, organizerId) {
	  return $http.put('/tickets/checkIn').then(function(result){
		  return result.data;
	  }, function(error){
		  throw (error);
	  })//error route 
  }//checkIn 
  purchaseFactory.getCart = function(userId) {
	return $http.get('/users/shoppingCart/'+userId).then(function(result){
		console.log("cart from service", result.data);
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
}]);
