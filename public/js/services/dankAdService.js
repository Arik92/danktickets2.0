app.factory('dankAdService', [function(){
  var adService = {};

  adService.dummyAds = [
    { name: "cannabis oil", 
      imgURL: "../../img/dummy-ads/cannabis-oil.png", 
      uiSref: "" 
    },
    { name: "Edibles", 
      imgURL: "../../img/dummy-ads/edibles.jpg", 
      uiSref: "" 
    },
    { name: "In N' Out", 
      imgURL: "../../img/dummy-ads/in-n-out.jpg", 
      uiSref: "" 
    }
  ];

  return adService;
}]);