const router = require("express").Router();
const passport = require("passport");

router.get(
  "/",
  // (req,res)=>{
  //     //handle with passport
  //     res.send('logging in with google..')
  // }

  //to let passport know that it's auth with 'google'
  passport.authenticate(
    "google" /* param1 */,
    { scope: ["profile"] } /* param2 : object for info specification*/
  )
);
//auth callback --> get the code to exchange for info
router.get(
  "/callback",
  passport.authenticate("google"),
  /* A peice of middleware, 
    it already has the req,res with the appended code,
   so it redirects to google and gets the userinfo 
   
   and fires the callback function in passport Schema*/ (
    req,
    res
  ) => {
    res.redirect('/profile')
  }
);

module.exports = router;
