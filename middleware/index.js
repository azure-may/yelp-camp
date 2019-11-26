var Campground = require("../models/campground");
var Comment    = require("../models/comment");
const { check, validationResult } = require("express-validator");

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

middlewareObj.isValidRegister = [
  check('username').isAlphanumeric().withMessage('Username may only contain alphanumeric characters.'),
  check('username').isLength( {min: 5, max: 15} ).withMessage('Username must be between 5 and 15 characters long.'),
  check('password').isAlphanumeric().withMessage('Password may only contain alphanumeric characters.'),
  check('password').isLength( {min: 5, max: 15} ).withMessage('Password must be between 5 and 15 characters long.'),
  check('password').custom((value,{req, loc, path}) => {
            if (value === req.body.confirm) return value;
            else throw new Error('Password and confirm password inputs must match.');
        }),
  (req, res, next) => {
    const errors = validationResult(req);
    if( errors.isEmpty() ){
        return next();
    }
    else {
        const message = formatErrorMessage(errors);
        req.flash("error", message);
        res.redirect("back");
    }
  }
];

middlewareObj.isValidLogin = [
    check('username').isAlphanumeric().isLength( {min: 5, max: 15} ).withMessage('That is not a valid username.'),
    check('password').isAlphanumeric().isLength( {min: 5, max: 15} ).withMessage('That is not a valid password.'),
    (req, res, next) => {
    const errors = validationResult(req);
    if( errors.isEmpty() ){
        return next();
    }
    else {
        const message = formatErrorMessage(errors);
        req.flash("error", message);
        res.redirect("back");
    }
  }
];

middlewareObj.isValidCampground = [
    check('campground.name').not().isEmpty().withMessage('Please enter a name.').whitelist('A-Za-z0-9_:-\\s'),
    check('campground.price').isFloat().withMessage('Please enter a price.'),
    check('campground.image').isURL( {protocols: ['https']} ).withMessage('Please enter a valid URL beginning with https.').whitelist('A-Za-z0-9\&./=_:?-'),
    check('campground.description').not().isEmpty().withMessage('Please enter a description.').whitelist('A-Za-z0-9.!_:;?-\\s'),
    (req, res, next) => {
    const errors = validationResult(req);
    if( errors.isEmpty() ){
        return next();
    }
    else {
        const message = formatErrorMessage(errors);
        req.flash("error", message);
        res.redirect("back");
    }
  }
];

middlewareObj.isValidComment = [
    check('comment.text').not().isEmpty().withMessage('Please enter a comment.').whitelist('A-Za-z0-9.!_:;?-\\s'),
    (req, res, next) => {
    const errors = validationResult(req);
    if( errors.isEmpty() ){
        return next();
    }
    else {
        const message = formatErrorMessage(errors);
        req.flash("error", message);
        res.redirect("back");
    }
  }
];

function formatErrorMessage(errors){
    let message = ''
    let data = errors.array()
    data.forEach( error => {
        message += `${error.msg}  `;
    });
    return message;
}

module.exports = middlewareObj;