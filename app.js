var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");

seedDB();

mongoose.connect("mongodb://localhost/yelp_camp_v2",{useMongoClient:true});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "pug");



// Campground.create({
//     name:"Salmon Creek",
//     image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"
// },function(err,campground){
//     if(err){
//         console.log(err);
//     } 
//     else{
//         console.log("newly Created campground: ");
//         console.log(campground);
//     }
// });

// Campground.create({
//     name:"Granite Hill",
//     image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
//     description:"This is a huge grantie hill, no bathroom, no water. Beautiful"
// },function(err,campground){
//     if(err){
//         console.log(err);
//     } 
//     else{
//         console.log("newly Created campground: ");
//         console.log(campground);
//     }
// });


app.get("/", (req, res) => {
    res.render("landing");
});

// app.get("/campgrounds",(req,res)=>{
//     var campgrounds = [
//         {name:"Salmon Creek",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
//         {name:"Granite Hill",image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
//         {name:"Yosimite",image:"https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg"}
//     ];

//     res.render("campgrounds",{campgrounds:campgrounds})
// })

var campgrounds = [{
        name: "Salmon Creek",
        image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"
    },
    {
        name: "Granite Hill",
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"
    },
    {
        name: "Yosimite",
        image: "https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg"
    },
    {
        name: "Salmon Creek",
        image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"
    },
    {
        name: "Granite Hill",
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"
    },
    {
        name: "Yosimite",
        image: "https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg"
    },
    {
        name: "Salmon Creek",
        image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"
    },
    {
        name: "Granite Hill",
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"
    },
    {
        name: "Yosimite",
        image: "https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg"
    }
];
app.get("/campgrounds", (req, res) => {
    Campground.find({},function(err,campgrounds){
        if(err) console.log(err);
        else {
            res.render("index", {
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
    res.render("new");
});
//SHOW - shows more info about on campground
app.get("/campgrounds/:id",(req,res)=>{
    //find the campground with providd ID
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show",{campground:foundCampground});
        }
    });
    //render 

    
})

app.listen(3000, function () {
    console.log("The YelpCamp loaded");
});

