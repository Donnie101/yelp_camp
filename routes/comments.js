const express = require('express');
var router = express.Router({mergeParams:true});
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const User = require('../models/user');
const middleware = require('../middleware');

//ADD COMMENT
router.get('/new',middleware.isLoggedIn,function(req,res){
  Campground.findById(req.params.id,function(err,campground){
    if(err){
      console.log(err);
    }else {
      res.render('comments/new',{campground:campground});

    }
  });

});

//SUBMIT COMMENT
router.post('/',middleware.isLoggedIn,function(req,res){
  var comment = req.body.comment;
  Campground.findById(req.params.id,function(err,campground){
    if(err){
      req.flash('error','Something went wrong');
      console.log(err);
      res.redirect('/campgrounds');
    }else{
      Comment.create(req.body.comment,function(err,comment){
        if (err) {

        }else {
          req.flash('success','Successfully added comment')
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          console.log(comment);
          res.redirect('/campgrounds/'+req.params.id)
        }
      });

    }
  });
});

//EDIT COMMENT
router.get('/:comment_id/edit',middleware.checkCommmentOwnership,function(req,res){
  Comment.findById(req.params.comment_id,function(err,foundComment){
    if(err){
      res.redirect('back');
    }else {
      res.render('comments/edit',{campground_id:req.params.id,comment:foundComment})

    }
  });
});

///UPDATE COMMENT
router.put('/:comment_id/',middleware.checkCommmentOwnership,function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
    if(err){
      res.redirect('back')
    }else {
      res.redirect('/campgrounds/'+req.params.id);
    }
  });
});

//DELETE COMMENT
router.delete('/:comment_id/',middleware.checkCommmentOwnership,function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id,function(err){
    if(err){
      res.redirect('back');
    }else {
      req.flash('success','Comment deleted');
      res.redirect('/campgrounds/'+req.params.id);
    }
  });
});



module.exports = router;
