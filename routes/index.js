var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", (req, res) => {
    res.render("landing");
});

router.get("/register",(req,res)=>{
    res.render("register");
});

//handle sign up logic

router.post("/register",(req,res)=>{
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,(err,user)=>{
        if(err){
            req.flash("error",err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to YelpCamp" + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login",passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"login"
    }), function(req,res){
    
});
//log out route
router.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success","Logged you out!");
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;