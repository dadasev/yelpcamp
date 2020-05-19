const express    = require("express"),
	  router     = express.Router({mergeParams: true}),
	  Campground = require("../models/campground"),
	  Comment    = require("../models/comment"),
	  middleware = require("../middleware");

//Comments New

router.get("/new", middleware.isLoggedIn, (req, res)=>{
	//find campground by id and show new form with info from that campground
	Campground.findById(req.params.id, (err, foundCampground)=>{
		if(err){
			console.log(err)
		} else {
			res.render("comments/new", {campground: foundCampground})
		}
	})
});

//Comments Create

router.post("/", middleware.isLoggedIn, (req, res)=>{
	//lookup campground using id
	Campground.findById(req.params.id, (err, campground)=>{
		if(err){
			req.flash("error", "Something went wrong");
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, (err, comment)=>{
				if(err){
					console.log(err);
				} else {
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save the comment:
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Comment added!")
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	})
});

//EDIT COMMENT ROUTE

router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res)=>{
	Campground.findById(req.params.id, (err, foundCampground)=>{
		if(err || !foundCampground){
			req.flash("error", "No Campground found");
			return res.redirect("back");
		}
		Comment.findById(req.params.comment_id, (err, foundComment)=>{
			if(err){
				res.redirect("back");
			} else {
				res.render("comments/edit", {campgroundId: req.params.id, comment: foundComment});
			}
		})
	})

});

//UPDATE COMMENT ROUTE

router.put("/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment updated successfully!")
			res.redirect("/campgrounds/" + req.params.id );
		}
	})
});

//DESTROY COMMENT ROUTE

router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
	Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

module.exports = router;