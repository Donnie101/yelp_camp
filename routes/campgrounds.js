const express = require('express');
var router = express.Router();
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware');

//SHOW ALL CAMPGROUNDS
router.get('/',function(req,res){

  Campground.find({},function(err,campgrounds){
    if(err){
      console.log(err);
    }else {
      res.render('campgrounds/index',{campgrounds:campgrounds,currentUser:req.user});
    }
  })
});

//SHOW CAMPGROUND
router.post('/',middleware.isLoggedIn,function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {id:req.user._id,username:req.user.username};
  var newCampground = {name:name,image:image,description:description,author:author};
  Campground.create(newCampground,function(err,newCampground){
    if(err){
      console.log(err);
    }else{

      res.redirect('/campgrounds');
    }
  })

});

router.get('/new',middleware.isLoggedIn,function(req,res){
  res.render('campgrounds/new');
})

router.get('/:id',function(req,res){
  Campground.findById(req.params.id).populate('comments').exec(function(err,foundCampground){
    if(err){
      console.log(err);
    }else {
      res.render('campgrounds/show',{campground:foundCampground,currentUser:req.user})

    }
  })

});

//EDIT CAMPGROUND
router.get('/:id/edit',middleware.checkCampgroundOwnership,function(req,res){
      Campground.findById(req.params.id,function(err,campground){
        if (err) {
          req.flash('error','Campground not found');
          res.redirect('/campgrounds')
        }else {
          res.render('campgrounds/edit',{campground:campground});

        }
    });
});

//UPDATE CAMPGROUND
router.put('/:id',middleware.checkCampgroundOwnership,function(req,res){
  Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
    if(err){
      res.redirect('/campgrounds')
    }else{
      res.redirect('/campgrounds/'+updatedCampground._id)
    }
  })
});

//DELETE CAMPGROUND
router.delete('/:id',middleware.checkCampgroundOwnership,function(req,res){
  Campground.findByIdAndRemove(req.params.id,function(err){
    if(err){
      res.redirect('/campgrounds');
    }else {
      res.redirect('/campgrounds')
    }
  })

})


module.exports = router;
