app.factory('merchService', ['$http', function ($http) {

  var createMerchant = function (key, entity, members, merchant) {
	  //console.log("entity is", entity);
	  var req = {
      method: 'POST',
      url: 'https://test-api.splashpayments.com/merchants',	    
      headers: {
      'Content-Type': 'application/json',      
	  'APIKEY': key	  
      },
      data: { 
	      "new": merchant.isNew,
		  "established": merchant.established,
		  "annualCCSales": merchant.annualCCSales,
		  "mcc": merchant.mcc,
		  "status": merchant.status, 
	  'entity': entity, 
	  'members': members
	  },//data 
     }
    return $http(req).then(function (result) {
      //console.log("service result", result);
      return result.data;
    }, function (error) {
      console.error(error);
      throw (error);
    }) // add promise
  }// post merchant


  return {   
    createMerchant: createMerchant    
  };
}]);
