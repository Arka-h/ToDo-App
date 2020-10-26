const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../keys/googleKeys");
const User = require("../models/Users");
// add the mongo db user model
// this is the User class
module.exports = function (passport) {
  passport.serializeUser((user, callback) => {
    callback(null, user.id);
  });

  passport.deserializeUser((id, callback) => {
    User.findOne({ _id: id }, (err, user) => {
      callback(err, user)});
  }); /* id is taken from the cookie an find by id the user and pass it to us */

  passport.use(
    new GoogleStrategy(
      {
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
      },
      (accessToken, refreshToken, profile, callback) => {
        User.findOne({ googleID: profile.id }).then((user) => {
          if (user) {
            console.log(`Found user!` + user.username);
            callback(null, user);
          } else {
            new User({
              username: profile.displayName,
              googleID: profile.id,
              thumbnail: profile._json.picture,
            })
              .save()
              .then((newUser) => {
                console.log(`Added new user!` + newUser.username);
                callback(null, newUser);
              });
          }
        });
      }
    )
  );
};
