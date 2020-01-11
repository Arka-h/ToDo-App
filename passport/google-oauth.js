const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

passport.use(
  new GoogleStrategy( //1st param
    {
      //options for startegy
      clientID:'197216956050-00iqehjqsl4bob61gshqgu7ovai5vn4u.apps.googleusercontent.com',
      clientSecret:'3yklgJjxjrdv1vkSJmI5pKl5'
    }),
    //2nd param
    () => {
      //passport callback function
    }
  
);
