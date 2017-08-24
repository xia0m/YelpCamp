var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {name:"High Garden",
     image:"https://source.unsplash.com/tPKQwYHy8q4/1600x900",
     description:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
     Donec dictum est elit, ut ornare ante feugiat vel.Vestibulum nec cursus enim, 
     in cursus sapien. Nunc ut lacus ante. Morbi ornare ligula in purus consequat, 
     a rhoncus mi iaculis.  Proin laoreet tortor ac lorem venenatis gravida. 
     Maecenas mollis iaculis mauris. Duis tempor malesuada felis, ut egestas nulla pharetra id.`},
     {name:"King's Landing",
     image:"https://source.unsplash.com/sx567MsyF7M/1600x900",
     description:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
     Donec dictum est elit, ut ornare ante feugiat vel.Vestibulum nec cursus enim, 
     in cursus sapien. Nunc ut lacus ante. Morbi ornare ligula in purus consequat, 
     a rhoncus mi iaculis.  Proin laoreet tortor ac lorem venenatis gravida. 
     Maecenas mollis iaculis mauris. Duis tempor malesuada felis, ut egestas nulla pharetra id.`},
     {name:"Winterfell",
     image:"https://source.unsplash.com/5i664o1oY4c/1600x900",
     description:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
     Donec dictum est elit, ut ornare ante feugiat vel.Vestibulum nec cursus enim, 
     in cursus sapien. Nunc ut lacus ante. Morbi ornare ligula in purus consequat, 
     a rhoncus mi iaculis.  Proin laoreet tortor ac lorem venenatis gravida. 
     Maecenas mollis iaculis mauris. Duis tempor malesuada felis, ut egestas nulla pharetra id.`},
     {name:"River Run",
     image:"https://source.unsplash.com/tOsKxvyNyDw/1600x900",
     description:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
     Donec dictum est elit, ut ornare ante feugiat vel.Vestibulum nec cursus enim, 
     in cursus sapien. Nunc ut lacus ante. Morbi ornare ligula in purus consequat, 
     a rhoncus mi iaculis.  Proin laoreet tortor ac lorem venenatis gravida. 
     Maecenas mollis iaculis mauris. Duis tempor malesuada felis, ut egestas nulla pharetra id.`}
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


