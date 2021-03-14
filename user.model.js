const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: "fullName can't be empty",
    },
    email: {
        type: String,
        required: "email can't be empty",
        unique: true,
    },
    password: {
        type: String,
        required: "password can't be empty",
        minlength: [4, "password must be Atleast of 4 length"],
    },
    saltSecret: String,
});

//custom validation for email
userSchema.path("email").validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, "Invalid e-mail.");

//Event
userSchema.pre("save", function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

mongoose.model("User", userSchema);
