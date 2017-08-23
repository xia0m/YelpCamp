var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {name:"High Garden",
     image:"https://goo.gl/vg3zHS",
     description:"first"},
     {name:"King's Landing",
     image:"https://goo.gl/Dr86Va",
     description:"second"},
     {name:"Winterfell",
     image:"https://goo.gl/KTAW8h",
     description:"third"}
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    Comment.create({
                        text:"This place is greate, but I wish there was interest",
                        author:"Homer"
                    }, function(err,comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }
                    })
                }
            })
        })
    });
    
    
};

module.exports = seedDB;



