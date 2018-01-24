app.factory('linkService', function(){
  linkService = {};

  linkService.socialLinks = [
    { platform: "instagram", url:"#", faClass: "fa fa-instagram" },
    { platform: "facebook", url:"#", faClass: "fa fa-facebook" },
    { platform: "snapchat", url:"#", faClass: "fa fa-snapchat" },
    { platform: "twitter", url:"#", faClass: "fa fa-twitter" }
  ];

  linkService.footerLinks = [
    { name: "Who We Are", uiSref: "" },
    { name: "Work With Us", uiSref: "" },
    { name: "Privacy", uiSref: "" },
    { name: "Terms", uiSref: "" },
    { name: "Help", uiSref: "" },
    { name: "Contact", uiSref: "" }
  ]

  return linkService;
});