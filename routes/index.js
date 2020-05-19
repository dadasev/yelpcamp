const express    = require("express"),
	  router     = express.Router(),
	  User       = require("../models/user"),
	  Campground = require("../models/campground"),
	  passport   = require("passport");

//Root Route

router.get("/", (req, res) => {
	res.render("landing");
});


//AUTHENTICATION

// show sign up/register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//handle the registering of a new user

router.post("/register", (req, res)=>{
	var newUser = new User({
		username: req.body.username,
		avatar: req.body.avatar,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email
	});
	if(req.body.adminCode === "secretcode123"){
		newUser.isAdmin = true;
	}
	User.register(newUser, req.body.password, (err, user)=>{
		if(err){
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Signed up successufully!");
			res.redirect("/campgrounds");
		});
	});
});


//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

//handling user login

router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}),(req, res)=>{	
});

//Logout Route

router.get("/logout", (req, res)=>{
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/campgrounds")
});

//USER PROFILE
router.get("/users/:id", (req, res)=>{
	User.findById(req.params.id, (err, foundUser)=>{
		if(err){
			req.flash("error", "Something went wrong!");
			res.redirect("back");
		}
		Campground.find().where("author.id").equals(foundUser._id).exec(function(err, campgrounds) {
			if(err){
				req.flash("error", "Something went wrong!");
				res.redirect("back");
			}
			res.render("users/show", {user: foundUser, campgrounds: campgrounds});
		});
	})
});


module.exports = router;