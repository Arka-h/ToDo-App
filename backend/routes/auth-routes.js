//https://youtu.be/or1_A4sJ-oY
const router = require("express").Router();
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
  req.logout();
  res.redirect('/');
}); 
//TODO :find out what send does, why not post?


module.exports = router;
