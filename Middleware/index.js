const express = require("express");
const { get } = require("mongoose");
const app = express();
const morgan = require("morgan");

app.use(morgan("tiny")); // app.use is used to run the function on  every incoming request

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use("/dogs", (req, res, next) => {
    console.log("I Love Dogs");
    next();
})

app.get("/", (req, res) => {
    console.log(`REQUEST DATE : ${req.requestTime}`);
    res.send("Home Page");
})

app.get("/dogs", (req, res) => {
    console.log(`REQUEST TIME : ${req.requestTime}`);
    res.send("Woof Woof!");
})

app.listen(3000, () => {
    console.log("App is running on localhost:3000");
})