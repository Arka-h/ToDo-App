//https://youtu.be/or1_A4sJ-oY
const router = require("express").Router();
const googleRouters = require("./auth-google-routes");

// auth with google
router.use("/google", googleRouters);

// auth logout
router.get("/logout", (req, res) => {
  //handle with passport
  req.logout();
  console.log(req)
  res.redirect('/')
}); 


module.exports = router;
