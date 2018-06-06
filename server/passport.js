const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const user = require('./database/database');

passport.use(new GoogleStrategy({
  // options for google strategy
  callbackURL: '/auth/google/redirect',
  clientID: keys.google.clientId,
  clientSecret: keys.google.clientSecret,
}, (accessToken, refreshToken, profile, done) => {
  // passport Callback function
  // check if user exists in database
  user.UserfindOne({
    googleId: profile.id,
  })
    .then((currentUser) => {
      if (currentUser) {
      // User exists
        console.log(`user is: ${currentUser}`);
      }
      // create user
      new user.User({
        username: profile.displayName,
        googleId: profile.id,
      }).save().then((newUser) => {
        console.log(`new user created: ${newUser}`);
      });
    });
}));
