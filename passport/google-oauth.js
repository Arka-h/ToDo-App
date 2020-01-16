const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("../keys/authKeys");
// add the mongo db user model
const User = require("../models/user-model");
// this is the User class

passport.use(
  new GoogleStrategy(
    /* 1st param */ {
      callbackURL: "/auth/google/callback",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    /* 2nd param */
    (accessToken, refreshToken, profile, done) => {
      /* passport callback function, fires after 
        google sends user data after accepting code sent */
      new User({
        username: profile.displayName,
        googleID: profile.id
      }).save() /* save to the database */
    }
  )
);
