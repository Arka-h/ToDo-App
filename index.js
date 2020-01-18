const express = require("express");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
const dbkeys = require("./keys/dbKeys");
const cookieSession = require("cookie-session"); //class
const cookie = require("./keys/cookieKeys");
const passport = require("passport");
// set up view engine
app.set("view engine", "ejs"); //TODO: find out more about this later...

//set up cookie session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookie.cookieKey] //why the []?
  })
);
//initialize passport
app.use(passport.initialize());
//enable passport sessions
app.use(passport.session());
//set up auth routes

// 'authRoutes' --> houses the "/auth" routers,
// has no idea of it's Strategy
require("./passport/google-schema");
//now, it does!!
//connect mongoose
mongoose.connect(
  /* specify URI */ dbkeys.mongoDB.dbURI,
  /* callback functions */ () => {
    console.log(`connected to mongoDB Atlas`);
  }
);
// wire authRoutes...
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

//create home route
app.get("/", (req, res) => {
  res.render("home",{user:req.user});
});
//set up listener
app.listen(3000, () => {
  console.log("listening to port 3000 for requests");
});

// update to install passport-google-oauth20
