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
  Event.find({publisher: req.params.id}, function(err, resultEvents){
    if (err) {
      console.log(err);
    } else {
      res.send(resultEvents);
    }//else
  })//findCb
}) // get event by publisher

router.get('/searchByActivity/:type', function(req, res, next){
  Event.find({type: req.params.type}, function(err, resultEvents){
    if (err) {
      console.log(err);
    } else {
      res.send(resultEvents);
    }//else
  })//findCb
}) //NOTE: get event by a specific type criteria. for future use

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

module.exports = router;
