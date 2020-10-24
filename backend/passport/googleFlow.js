const GoogleStrategy = require("passport-google-oauth20");
const keys = require("../keys/googleKeys");
const User = require("../models/Users");
// add the mongo db user model
// this is the User class
module.exports = function (passport) {
  passport.use(
    //Schema
    new GoogleStrategy(
      {
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
      },
      /* 2nd param */
      (accessToken, refreshToken, profile, done) => {
        /* passport callback function, fires after 
        google sends user data after accepting code sent */
        /* find one is a function that returns a promise */
        User.findOne({ googleID: profile.id }).then((user) => {
          if (user) {
            console.log(`Found user!` + JSON.stringify(user));
            done(null, user);
          } else {
            new User({
              username: profile.displayName,
              googleID: profile.id,
              thumbnail: profile._json.picture,
            })
              .save()
              .then((newUser) => {
                console.log(`Added new user!` + newUser);
                done(null, newUser);
              });
          }
        });
        /* save to the database */

        /* goes to the callback attached to the google redirect page */
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(/* error */ null, user.id);
  });
  /* done=> go to the next stage=> make a cookie */

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  }); /* id is taken from the cookie an find by id the user and pass it to us */
};
