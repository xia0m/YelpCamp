const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");

router.get("/", (req, res) => {
    Campground.find({},function(err,campgrounds){
        if(err) console.log(err);
        else {
            res.render("campgrounds/index", {
                campgrounds: campgrounds
            });
        }
    })
    
});

router.post("/", middleware.isLoggedIn,(req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const desc = req.body.description;
    const author = {
        id:req.user._id,
        username:req.user.username
    }
    const newCampground = {
        name: name,
        price: price,
        image: image,
        description: desc,
        author:author
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

router.get("/new", middleware.isLoggedIn,(req, res) => {
    res.render("campgrounds/new");
});
//SHOW - shows more info about on campground
router.get("/:id",(req,res)=>{
    //find the campground with providd ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        } else {
            
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
    //render 
});

//Edit Campground
router.get("/:id/edit",middleware.checkOwner,(req,res)=>{
    //is user logged in ?
        //does user own the campground?
        Campground.findById(req.params.id,function(err,foundCampground){
            res.render("campgrounds/edit",{campground:foundCampground});
});
});
//Update campgorund route
router.put("/:id",(req,res)=>{
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,(err,updatedCampground)=>{
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/"+ req.params.id);
        }
    })
});

//Destory Campground route
router.delete("/:id",middleware.checkOwner,(req,res)=>{
    Campground.findByIdAndRemove(req.params.id,(err)=>{
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
})





module.exports = router;
