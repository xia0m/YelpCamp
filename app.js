var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");



mongoose.connect("mongodb://localhost/yelp_camp_v4",{useMongoClient:true});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "pug"); 6
seedDB();




app.get("/", (req, res) => {
    res.render("landing");
});
  
app.get("/campgrounds", (req, res) => {
    Campground.find({},function(err,campgrounds){
        if(err) console.log(err);
        else {
            res.render("campgrounds/index", {
                message: campgrounds
            });
        }
    })
    
});

app.post("/campgrounds", (req, res) => {
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

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});
//SHOW - shows more info about on campground
app.get("/campgrounds/:id",(req,res)=>{
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
})
//===================
// Comments routes
//=================
app.get("/campgrounds/:id/comments/new",(req,res)=>{
    //find campground by i 
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{campground:campground});
        }
    })
    
});

app.post("/campgrounds/:id/comments",(req,res)=>{
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

app.listen(3000, function () {
    console.log("The YelpCamp loaded");
});

