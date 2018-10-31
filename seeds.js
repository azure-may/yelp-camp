var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

var data = [
    {
        name:"Stone Cathedral",
        image:"https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name:"Clouds Rest",
        image:"https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name:"Alpine Meadow",
        image:"https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name:"White Sands",
        image:"https://images.pexels.com/photos/872831/pexels-photo-872831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sapien turpis, mattis vitae cursus in, pellentesque tincidunt mauris. Vivamus vel nisl non sapien facilisis malesuada."
    }
]

// function seedDB(){
    // //remove all campgrounds
    // Comment.remove({}, function(err){
    //     if (err){
    //         console.log(err);
    //     }
    // });
    // Campground.remove({}, function(err){
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log("removed campgrounds");
        //add new campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if (err){
        //             console.log(err);
        //         } else {
        //             console.log("added a campground");
        //             //add a few comments
        //             Comment.create({
        //                 text: "This place is amazing!",
        //                 author: "San Pedro"
        //             }, function (err, comment){
        //                 if (err){
        //                     console.log(err)
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("new comment");
        //                     }
        //                 }
        //             );
        //         }
        //     });        
        // });
//     });
// }

// module.exports = seedDB;