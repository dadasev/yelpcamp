const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	avatar: {type: String, default: "https://banner2.cleanpng.com/20180128/yvw/kisspng-ninja-ico-icon-black-ninja-5a6dee087cdc18.5588411915171538005114.jpg"},
	firstName: String,
	lastName: String,
	email: String,
	isAdmin: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);