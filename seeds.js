const mongoose = require("mongoose"),
	  Campground = require("./models/campground"),
	  Comment = require("./models/comment");

const seeds = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author:{
            id : "588c2e092403d111454fff76",
            username: "Jack"
        }
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author:{
            id : "588c2e092403d111454fff71",
            username: "Jill"
        }
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author:{
            id : "588c2e092403d111454fff77",
            username: "Jane"
        }
    }
]


async function seedDB(){
	try {
		await Campground.deleteMany({});
		await Comment.deleteMany({});
		for(const seed of seeds){
			let campground = await Campground.create(seed);
			let comment = await Comment.create({
				text: "There's a serial killer lurking around at night!",
				author: "Scared camper"
				});
			campground.comments.push(comment);
			campground.save();
		};
	} catch(err){
		console.log(err);
	}
};


// function seedDB(){
// 	//remove all campgrounds
// 	Campground.deleteMany({}, function(err){
// 		if(err){
// 			console.log(err);
// 		}
// 		console.log("removed campgrounds!");
// 		//remove comments
// 		Comment.deleteMany({}, function(err){
// 			if(err){
// 			console.log(err);
// 		}
// 			console.log("removed comments!");
// 			//add a few campgrounds
// 			seeds.forEach(function(seed){
// 				Campground.create(seed, function(err, campground){
// 					if(err){
// 						console.log(err);
// 					} else {
// 						console.log("added a campground");
// 						//create comment
// 						Comment.create({
// 							text: "There's a serial killer lurking around at night!",
// 							author: "Scared camper"
// 						}, function(err, comment){
// 							if(err){
// 								console.log(err);
// 							} else {
// 								campground.comments.push(comment);
// 								campground.save();
// 								console.log("created a comment")
// 							}
// 						})
// 					}
// 				})
// 			})
// 		})

// 	});
// };

module.exports = seedDB;
