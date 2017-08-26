var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment")
var middleware = require("../middleware");

router.get("/new",middleware.isLoggedIn,(req,res)=>{
    //find campground by i 
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{campground:campground});
        }
    })
    
});

router.post("/",middleware.isLoggedIn,(req,res)=>{
    //lookup campground using ID
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            
            //save comment
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    req.flash("error","Something went wrong");
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // console.log("======================The new user is "+req.user);
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Successfully added comment");
                    res.redirect("/campgrounds/"+campground._id);
                }
            })
        }
    })
    //create new comment
    //connect new coment to campground
    //redirect to campground show page
});

router.get("/:comment_id/edit",middleware.checkOwnerComment,(req,res)=>{
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
        }
    });
    
})

router.put("/:comment_id",middleware.checkOwnerComment,(req,res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,updatedComment)=>{
        if (err) {
            console.log("back");
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});


//Comment Destory route
router.delete("/:comment_id",middleware.checkOwnerComment,(req,res)=>{
    //findByIdandRemove
    Comment.findByIdAndRemove(req.params.comment_id,(err)=>{
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success","Comment deleted");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

module.exports = router;

