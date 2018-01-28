var express = require('express');
var router = express.Router();
var Profile = require("../models/profilemodel");
var User = require("../models/usermodel");

/////////////////////////////////////////////////////multer/////////////////////////////////////////////////////////
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/uploads')
    },
    filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
});
var upload = multer({ storage: storage }).single('file');
/////////////////////////////////////////////////////multer/////////////////////////////////////////////////////////

router.get('/', function (req, res, next) {
  Profile.find(function(error, result){
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }//else
  })//find()
});//get all profiles on the site(gould the functionality be needed)

/*router.get('/:id', function(req, res, next){
  Profile.find({owner: req.params.id}, function(err, resultProfiles){
    if (err) {
      console.log(err);
    } else {
      res.send(resultProfiles);
    }//else
  })//findCb
}) // get all of a user's profiles*/
router.get('/findById/:id', function(req, res, next){
	//console.log("id is", req.params.id);
  Profile.find({_id: req.params.id}).populate('owner').exec(function(err, profile){
    if (err) {
      console.error(err);
    } else {      
	console.log("found profile", profile);
      res.send(profile);
    }
  })//exec()
}) // get organizer by its unique id.
router.get('/:name', function(req, res, next){
  Profile.find().populate({
	  path: 'owner',
	  model: 'User',
	  match: {username: req.params.name}
	  }).exec(function(err, foundProfiles) {
    if (err) {
      console.log(err);
      res.send(err);
    }  else {   
		console.log("found profiles", foundProfiles);
		var result = [];
		for (var i=0;i<foundProfiles.length;i++) {
			if (foundProfiles[i].owner) {
				result.push(foundProfiles[i]);
			}
		}//for 
		  res.send(result);
    }//else
});
}) // get profiles by OWNER Name.

router.post('/upload', function (req, res1, next) {
  upload(req,res1,function(err){
             if(err){
                  res1.json({error_code:1,err_desc:err});
                  return;
             }
             console.log("request to work with is", req.body);
             console.log("file name:", req.file.filename);
              var p = new Profile(req.body.organizer);
			  p.image = '/img/uploads/'+req.file.filename;              
              p.save(function(error, result){
                if (error) {
                  console.log("reached error route");
                  console.log(error);
                } else {
                  console.log("reached profile result route");

                  // res.send(result);
                  res1.send({error_code:0,err_desc:null, file_name: req.file.filename});
                }//else
              });
         })
     });// path for regular uploads

router.post('/', function (req, res1, next) {
 var p = new Profile(req.body);
 //e.image = req.file.filename; //TODO: save some default image
 p.save(function(error, result){
 if (error) {
 console.log("reached error route");
 console.log(error);
  } else {
    console.log("reached profile (no img) result route");
    // res.send(result);
    res1.send(result);
    }//else
  });
})//regular uploads(no pic provided)

router.delete("/:id",function(req,res){
  //TODO: delete associated image
  Profile.findOneAndRemove({ _id: req.params.id }, function(err, removedProfile) {
    if (err) {
      console.log(err);
      res.send(err);
    }  else {
      console.log("removed", removedProfile);
      res.send(event);
    }
});
});
router.post('/deleteAndUpload', function(req, res1, next) {
  //TODO: check if the image has changed. if it did, delete and replace it with the new one
  upload(req,res1,function(err){
           if(err){
                res.json({error_code:1,err_desc:err});
                return;
           }
           console.log("request to work with is", req.body);
           if (req.body.organizer.imgPath!="/img/uploads/undefined") {
           var fs = require('fs');
           var addressToDelete = req.body.organizer.image;
         }//if there's no image, there is nothing to delete. TODO: change to default picture
           console.log("file name:", req.file.filename);
           req.body.organizer.image = '/img/uploads/'+req.file.filename;
           Profile.findByIdAndUpdate(req.body.organizer._id, req.body.organizer, { new: true }, function(error, profile) {
             if (error) {
               console.error(error)
               return next(error);
             } else {
               if (addressToDelete) {
                 fs.unlink(addressToDelete,function(response){
                   res1.send({error_code:0,err_desc:null, file_name: req.file.filename});
                 }); //TODO: need the path for the file
               } else {
               res1.send({error_code:0,err_desc:null, file_name: req.file.filename});
             }//else file wasnt deleted
            }//else mongo
           });
         }); // path for updates
       })// put request for also updating image

router.put('/:id', function(req, res1, next) {
  console.log("request body is", req.body);
  Profile.findByIdAndUpdate(req.body._id, req.body, { new: true }, function(error, profile) {
    if (error) {
     console.error(error)
     return next(error);
    } else {
     res1.send(profile);
   }//else
  });//mongo CB
})// put route - without updating pictures
module.exports = router;
