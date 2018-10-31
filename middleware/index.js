var Campground = require("../models/campground");
var Comment    = require("../models/comment");

var middlewareObj = {};

middlewareObj.isAuthor = function (req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, camp){
        if (err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            if (camp.author.id.equals(req.user._id)){
                next();                 
            } else {
                req.flash("error", "Only the author may edit a campground");
                res.redirect("back");
            }
        }
        });
    } else {
        req.flash("error", "You must be logged in");
        res.redirect("back");
    }
}

middlewareObj.isCommentAuthor = function (req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment){
        if (err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            if (comment.author.id.equals(req.user._id)){
                next();                 
            } else {
                req.flash("error", "Only the author may edit a comment");
                res.redirect("back");
            }
        }
        });
    } else {
        req.flash("error", "You must be logged in");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Sign In");
    res.redirect("/login");
}

module.exports = middlewareObj;