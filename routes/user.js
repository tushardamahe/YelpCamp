const express= require("express");
const router = express.Router();
const passport = require("passport");
const catchAysnc = require("../utils/catchAsync");
const user = require("../controllers/user");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

router.route("/register")
    .get(user.renderRegister)
    .post(catchAsync(user.register));

router.route("/login")
    .get(user.renderLogin)
    .post(passport.authenticate("local", { failureFlash : true, failureRedirect : "/login" }), user.login );  // passpprt method doing the authentication

router.get("/logout", user.logout)

module.exports = router;