const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username cannot be empty!"]
    },
    password: {
        type: String,
        required: [true, "Password cannot be empty!"]
    }
});

userSchema.statics.findAndValidate = async function(username, password) {
    const foundUser =  await this.findOne({ username });
    const isValid =  await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false; // turnerey opreator 
};

userSchema.pre("save", async function(next){
    // this.password = "NOT YOUR REAL PASSWORD!!!!"; // this will refer to particular model

    if (!this.isModified("password")) return next(); // if the password is not modified by user hashing will not work on password will call next and didn't hash the password
    this.password = await bcrypt.hash(this.password, 12) // this refers her  to user that we were creating in index.js
    next();
});

module.exports = mongoose.model("User", userSchema);