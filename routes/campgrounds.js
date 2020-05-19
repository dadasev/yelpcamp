const express    = require("express"),
	  router     = express.Router(),
	  Campground = require("../models/campground"),
	  middleware = require("../middleware");

//Campground Index (all campgrounds)

//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
       }
    });
});

// Campground New

router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

// Campground Create

router.post("/", middleware.isLoggedIn, (req, res) => {
	//add logged in user to the campground as an author:
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, price: price, image: image, description: desc, author: author}
	//create a new campground and save it to a DB:
	Campground.create(newCampground, (err, newlyCreated) => {
		if(err){
			console.log(err);
		} else {
			//redirect back to campgrounds:
			res.redirect("/campgrounds");
		}
	});
});

//Campground Show 

router.get("/:id", (req, res) => {
	//find the campground with provided ID:
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if(err || !foundCampground){
			console.log(err);
		} else {
			//render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	})

});

//Edit campground router

router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res)=>{
	Campground.findById(req.params.id, (err, foundCampground)=>{
		if(err){
			req.flash("error", "Campground not found");
			res.redirect("/campgrounds");
		} else {
			res.render("campgrounds/edit", {campground: foundCampground});
			}
	});
});

//Update campground route 

router.put("/:id", middleware.checkCampgroundOwnership, (req, res)=>{
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground)=>{
		if(err){
			res.redirect("/campgrounds");
		} else {
			//redirect to updated campground's show page
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//Destroy campground

router.delete("/:id", middleware.checkCampgroundOwnership, async(req, res) => {
	try {
		let foundCampground = await Campground.findById(req.params.id);
		await foundCampground.deleteOne();
		req.flash("success", "Campground deleted");
		res.redirect("/campgrounds");
	} catch (error) {
		console.log(error.message);
		res.redirect("/campgrounds");
	}
});

// router.delete("/:id", middleware.checkCampgroundOwnership, (req, res)=>{
// 	Campground.findByIdAndRemove(req.params.id, (err)=>{
// 		if(err){
// 			res.redirect("/campgrounds/" + req.params.id);
// 		} else {
			// req.flash("success", "Campground deleted");
// 			res.redirect("/campgrounds");
// 		}
// 	});
// });

module.exports = router;