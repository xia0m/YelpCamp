var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/", (req, res) => {
    
    Campground.find({},function(err,campgrounds){
        if(err) console.log(err);
        else {
            res.render("campgrounds/index", {
                message: campgrounds
            });
        }
    })
    
});

router.post("/", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: desc
    }
    //Create a new campgrounds and save to DB
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
   
    //get data from form and add to campgrounds array
    //redirect back to campgrounds page
});

router.get("/new", (req, res) => {
    res.render("campgrounds/new");
});
//SHOW - shows more info about on campground
router.get("/:id",(req,res)=>{
    //find the campground with providd ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
    //render 
});

module.exports = router;
