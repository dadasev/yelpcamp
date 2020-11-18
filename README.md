# YELPCAMP
A Yelp clone for Campgrounds.

Built using JS, MongoDB, Express and various middleware.

It has user authentication, basic authorization, CRUD operations, follows RESTful convention.

Deployed to Heroku: 
safe-stream-93835.herokuapp.com/

Features
Authentication:

* User login with username and password;

* Admin sign-up with admin code;

Authorization:

* One cannot manage posts and view user profile without being authenticated

* One cannot edit or delete posts and comments created by other users

* Admin can manage all posts and comments

* Manage campground posts with basic functionalities:

* Create, edit and delete posts and comments

* Upload campground photos

Manage user account with basic functionalities:

* Profile page setup with sign-up

* Flash messages responding to users' interaction with the app

* Responsive web design

Custom Enhancements
* Update campground photos when editing campgrounds
* Update personal information on profile page

Built with

Front-end:
* Bootstrap

Back-end:
* express
* mongoDB
* mongoose
* async
* passport
* passport-local
* express-session
* method-override
* nodemailer
* moment
* geocoder
* connect-flash
