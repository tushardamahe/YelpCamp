const express = require("express");
const app = express();
const User = require("./models/user"); // importing our userSchema model here
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");

mongoose.connect('mongodb://localhost:27017/authDemo')
    .then(() => {
        console.log("Mongo Connected")
    })
    .catch(err => {
        console.log("Error!")
        console.log(err)
    })

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "notagoodsecret" }));

const requireLogin = (req, res, next) => { // instead of doing "app.use" and always apply here we will define middleware
    if(!req.session.user_id) {
        return res.redirect("/login");
    }
    next();
} // we using this to check that user is logged in or not ( middleware )

app.get("/", (req, res) => {
    res.send("This is the home page!");
})

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    const { username, password } = req.body; // destructing the password from the body
    // const hash = await bcrypt.hash(password, 12); // hashing the password
    const user = new User({ username, password });
    await user.save();
    req.session.user_id = user._id;
    res.redirect("/")
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if(foundUser) {
        req.session.user_id = foundUser._id; // making sure user is in session and cannot open in another browser
        res.redirect("/secret");
    }
    else {
        res.redirect("/login");
    }
});

app.post("/logout", (req, res) => {
    // req.session.user_id = null; // this the minimun we need to stop tracking of user id
    // req.session.destroy(); // to end the session
    res.redirect("/login");
});

app.get("/secret", requireLogin, (req, res) => {
    res.render("secret");
});

app.get("/topsecret", requireLogin, (req, res) => {
    res.send("Top Secret!");
})

app.listen(3000, () => {
    console.log("Started!");
})