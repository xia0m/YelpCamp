const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const seedDB = require("./seeds");
const flash = require("connect-flash");
const Comment = require("./models/comment");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const methodOverride = require("method-override");

require('dotenv').config()
const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index");


try {
    const mongoDB = process.env.DATABASEURL;
    console.log('url is ', mongoDB);
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
        console.log('mongoose is connected');
    });
} catch (e) {
    console.error("Could not connect to mongoDB")
}


app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

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

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT||3000, function () {
    console.log("The YelpCamp loaded");
});

