var express =require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","pug");
app.get("/",(req,res)=>{
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

var campgrounds = [
    {name:"Salmon Creek",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
    {name:"Granite Hill",image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
    {name:"Yosimite",image:"https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg"},
    {name:"Salmon Creek",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
    {name:"Granite Hill",image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
    {name:"Yosimite",image:"https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg"},
    {name:"Salmon Creek",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
    {name:"Granite Hill",image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
    {name:"Yosimite",image:"https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg"}
];
app.get("/campgrounds",(req,res)=>{
    res.render("campgrd",{message:campgrounds})
});

app.post("/campgrounds",(req,res)=>{
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name,image:image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
    //get data from form and add to campgrounds array
    //redirect back to campgrounds page
});

app.get("/campgrounds/new",(req,res)=>{
    res.render("new");
});

app.listen(3000,function(){
    console.log("The YelpCamp loaded");
})