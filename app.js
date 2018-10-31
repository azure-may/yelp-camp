var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    flash          = require("connect-flash"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    User           = require("./models/user");
    // seedDB         = require("./seeds");

//ROUTES
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index");

//SETUP
// mongoose.connect("mongodb://localhost:27017/yelp_camp_v12", {useNewUrlParser: true});
mongoose.connect("mongodb://azuremay:7donqhtZR4QEZMqkfj@ds147003.mlab.com:47003/yelpcampam", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "A two million dollar woman am I. Everything I need is right here in my arms, and dreams, dreams they shall come.",
    resave: false,
    saveUninitialized: false
}));

//USE
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//SERVER
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server has Started!"); 
});