var express = require('express');
var router = express.Router();
var Event = require("../models/eventmodel");

router.get('/', function (req, res, next) {
  Event.find(function(error, result){
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }//else
  })//find()
});//get all events that were ever published

router.get('/:id', function(req, res, next){
  Event.findOne({_id: req.params.id}, function(err, resultEvent){
    if (err) {
      console.log(err);
    } else {
      res.send(resultEvent);
    }//else
  })//findOneCB
}) // get specific event

router.post('/', function (req, res, next) {
  var e = new Event(req.body);
  console.log("reached post route");
  e.save(function(error, result){
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }//else
  });
});//post event

// router.post('/:id/reviews', function(req, res, next) {
//   //var r = new Review();
//   Event.findOne({_id: req.params.id }, function(err, event){
//     if (err) {
//       console.log(err);
//       res.send(err);
//
//     } else {
//       console.log("found beer is: ");
//       console.log(beer);
//       beer.reviews.push(req.body);
//       beer.save(function(error, resolve){
//         if (error) {
//           console.log(error);
//         } else {
//           console.log(resolve);
//           res.send(resolve);
//         }
//       }); //beer save
//     } // else found beer
//   })// finding beer in mongod
//
// });// add review to a beer NOTE: might be repurposed for event tickets

// router.delete('/:id/reviews/:revId', function(req, res, next) {
//   Beer.findOne({_id: req.params.id }, function(err, beer){
//     if (err) {
//       console.log(err);
//       res.send(err);
//     } else {
//       console.log("found beer is: ");
//       console.log(beer);
//       var index = -1;
//         for (var i = 0;i<beer.reviews.length;i++) {
//         if (beer.reviews[i].id===req.params.revId) {
//           index = i;
//         }//if finding review index
//       }//for i
//       if (index!=-1) {
//         beer.reviews.splice(index,1);
//         beer.save(function(error, resolve){
//           if (error) {
//             console.log(error);
//           } else {
//             console.log(resolve);
//             console.log("Object deleted");
//             res.send(resolve);
//           }// else resolve
//       });
//       }//if -1
//     } // else found beer
//   })// finding beer in mongod
//
// });// add review to a beer NOTE: might be repurposed for event tickets

router.delete("/:id",function(req,res){
  Event.findOneAndRemove({ _id: req.params.id }, function(err, event) {
    if (err) {
      console.log(err);
      res.send(err);
    }  else {
      console.log(event);
      res.send(event);
    }
});
});
router.put('/:id', function(req, res, next) {
  Event.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(error, event) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(event);
    }
  });
});
// router.put('/rate/:id', function(req, res, next) {
//   Beer.findOneAndUpdate({ _id: req.params.id },  {$inc:  {ratings: req.body.currentRating, numRate: 1}}, { new: true }, function(err, beer) {
//     if (err) {
//       console.error(err)
//       return next(err);
//     } else {
//       console.log(beer);
//       res.send(beer);
//     }
//   });
// }); NOTE: might be repurposed for event tickets
module.exports = router;
