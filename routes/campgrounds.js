var express    = require("express");
var router     = express.Router(); 
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX
router.get("/", function(req, res){
    Campground.find({}, function(err, camps){
       if(err){
           req.flash("error", err.message);
       } else {
           res.render("campgrounds/index", {campgrounds: camps});
       }
    });
});

//CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, camp){
       if(err){
           req.flash("error", err.message);
           res.redirect("back");
       } else {
           req.flash("success", "Campground created");
           res.redirect("/campgrounds");
       }
    });
});

//NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

//SHOW
router.get("/:id", function(req, res){
    //find campground with id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err){
           req.flash("error", err.message);
           res.redirect("back");
        } else {
            //render show page with id
            res.render("campgrounds/show", {campground: foundCamp});
        }
    });
});

//EDIT
router.get("/:id/edit", middleware.isAuthor, function(req, res){
    Campground.findById(req.params.id, function(err, camp){
        if (err){
           req.flash("error", err.message);
           res.redirect("back");
        } else {
            res.render("campgrounds/edit", {campground: camp}); 
        }
    });
});

//UPDATE
router.put("/:id", middleware.isAuthor, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, camp){
        if(err){
           req.flash("error", err.message);
           res.redirect("back");
        } else {
            req.flash("success", "Campground has been updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/:id", middleware.isAuthor, function(req, res){
    if (req.isAuthenticated()){
        Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", err.message);
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground has been removed");
            res.redirect("/campgrounds");
        }
        });    
    } else {
        
    }
});

module.exports = router;