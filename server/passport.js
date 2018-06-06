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
  new user.User({
    username: profile.displayName,
    googleId: profile.id,
  }).save().then((newUser) => {
    console.log(`new user created: ${newUser}`);
  });
}));
