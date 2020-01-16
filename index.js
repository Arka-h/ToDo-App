const express = require("express");
const authRoutes = require("./routes/auth-routes");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
const dbkeys = require("./keys/dbKeys");
// set up view engine
app.set("view engine", "ejs");

//set up auth routes
// 'authRoutes' --> houses the google passport code,
// has no idea of it's Strategy
require("./passport/google-oauth");
//now, it does!!
mongoose.connect(/* specify URI */ dbkeys.mongoDB.dbURI, () => { 
  console.log(`connected to mongoDB`);
});
// wire authRoutes...
app.use("/auth", authRoutes);

//create home route
app.get("/", (req, res) => {
  res.render("home");
});
//set up listener
app.listen(3000, () => {
  console.log("listening to port 3000 for requests");
});

// update to install passport-google-oauth20
