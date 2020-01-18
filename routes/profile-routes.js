const router = require("express").Router();

/* if we are not logged in, we need to check it and reirect user to the login page
 * to do this we use middleware
*/
const authCheck = (req,res,next)=>{
    /* next is for passing control from middleware to next peice of middleware */
    if(!req.user){
        //not logged in
        //redirect
        res.redirect('/auth/login',)
        //no next
    }
    else{
        next();
    }
}
router.get("/",authCheck, (req, res) => {
  res.render('session',{user: req.user});
});

module.exports = router;
