//https://youtu.be/or1_A4sJ-oY
const router = require("express").Router();
const passport = require("passport");
const googleRouters = require("./auth-google-routes");
// auth login
router.get("/login", (req, res) => {
  res.render("login");
});

// auth with google
router.use("/google", googleRouters);

// auth logout
router.get("/logout", (req, res) => {
  //handle with passport

  res.send("logging out...");
});

module.exports = router;
