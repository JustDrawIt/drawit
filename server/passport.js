const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const db = require('./database/database');
// mongodb id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.User.findByid(id).then((user) => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  // options for google strategy
  callbackURL: '/auth/google/redirect',
  clientID: keys.google.clientId,
  clientSecret: keys.google.clientSecret,
}, (accessToken, refreshToken, profile, done) => {
  // passport Callback function
  // check if user exists in database
  db.User.findOne({
    googleId: profile.id,
  })
    .then((currentUser) => {
      if (currentUser) {
      // User exists
        console.log(`user is: ${currentUser}`);
        done(null, currentUser);
      }
      // create user
      new db.User({
        username: profile.displayName,
        googleId: profile.id,
      }).save().then((newUser) => {
        console.log(`new user created: ${newUser}`);
        done(null, newUser);
      });
    });
}));
