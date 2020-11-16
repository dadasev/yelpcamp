const express    = require("express"),
	  app        = express(),
	  bodyParser = require("body-parser"),
	  mongoose   = require("mongoose"),
	  flash      = require("connect-flash"),
	  passport   = require("passport"),
	  LocalStrategy = require("passport-local"),
	  passportLocalMongoose = require("passport-local-mongoose"),
	  methodOverride = require("method-override"),
	  User = require("./models/user"),
      Campground = require("./models/campground"),
	  Comment    = require("./models/comment"),
      seedDB     = require("./seeds");

const campgroundRoutes = require("./routes/campgrounds"),
	  commentRoutes    = require("./routes/comments"),
	  indexRoutes      = require("./routes/index");

mongoose.connect(process.env.DATABASEURL, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true
}).then(() => {
	console.log("Connected to DB Atlas!");
}).catch(err => {
	console.log("ERROR:", err.message);
});

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');

// seedDB();  - seed the database

//PASSPORT CONFIGURATION

app.use(require("express-session")({
	secret: "Ted Bundy",
	resave: false,
	saveUninitialized: false
}));
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

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server listening on port 3000");
});