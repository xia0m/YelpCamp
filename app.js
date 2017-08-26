var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var flash = require("connect-flash");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");


var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp_v8",{useMongoClient:true});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

//Passport Configuation
app.use(require("express-session")({
    secret:"Rusty wins",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000, function () {
    console.log("The YelpCamp loaded");
});

