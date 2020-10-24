const router = require("express").Router();
const passport = require("passport");

router.get(
  "/",
  passport.authenticate(
    "google",
    { scope: ["profile"] }
  )
);
//auth callback --> get the code to exchange for info
router.get("/redirect", passport.authenticate("google"), (req, res) => {
  console.log(res)
  res.redirect("/profile");
});

module.exports = router;
