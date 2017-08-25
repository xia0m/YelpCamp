var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment")

router.get("/new",isLoggedIn,(req,res)=>{
    //find campground by i 
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{campground:campground});
        }
    })
    
});

router.post("/",isLoggedIn,(req,res)=>{
    //lookup campground using ID
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            })
        }
    })
    //create new comment
    //connect new coment to campground
    //redirect to campground show page
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;

