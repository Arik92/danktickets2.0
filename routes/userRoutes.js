var User = require('../models/usermodel');

module.exports = function (router) {
  // http://localhost:8000/users
  router.post('/users', function(req, res){
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.tickets = req.body.tickets;
    user.image = req.body.image;
    if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {
      res.send('Ensure Username, Email and Password were provided');
    } else {
        user.save(function(err, newUser){
          if (err) {
            throw ('Username or Email already exist')
          } else {
            res.send(newUser);
          }
        });
      }
  });
  return router;
}