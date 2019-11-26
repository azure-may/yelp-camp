var express    = require("express");
var router     = express.Router({mergeParams: true}); 
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

//NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err){
           req.flash("error", err.message);
        } else {
            res.render("comments/new", {campground: campground});            
        }
    });
});

//CREATE
router.post("/", middleware.isValidComment, middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            req.flash("error", err.message); 
            res.redirect("/campgrounds");
        } else {
            console.log(req.body)
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    req.flash("error", err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment created");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//EDIT
router.get("/:comment_id/edit", middleware.isCommentAuthor, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.render("comments/edit", {camp_id : req.params.id, comment : foundComment});            
        }
    });
});

//UPDATE
router.put("/:comment_id", middleware.isValidComment, middleware.isCommentAuthor, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success", "Comment updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/:comment_id", middleware.isCommentAuthor, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;