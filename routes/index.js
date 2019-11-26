var express  = require("express");
var router   = express.Router(); 
var User     = require("../models/user");
var passport = require("passport");
var middleware = require("../middleware");

//LANDING
router.get("/", function(req, res){
    res.render("landing");
});

//REGISTER
router.get("/register", function(req, res) {
    res.render("register");
});

//CREATE
router.post("/register", middleware.isValidRegister, function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            req.flash("error", err.message);
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//LOG IN
router.get("/login", function(req, res) {
    res.render("login");
});

//AUTH
router.post("/login", middleware.isValidLogin, passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
});

//LOG OUT
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Successfully logged out");
    res.redirect("/campgrounds");
});

module.exports = router;