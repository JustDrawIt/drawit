const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { User } = require('./database/database');
const { GOOGLE_KEYS } = require('./config');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByid(id).then((user) => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  callbackURL: '/auth/google/redirect',
  clientID: GOOGLE_KEYS.CLIENT_ID,
  clientSecret: GOOGLE_KEYS.CLIENT_SECRET,
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id })
    .then((currentUser) => {
      if (currentUser) {
        done(null, currentUser);
      } else {
        new User({
          username: profile.displayName,
          googleId: profile.id,
        }).save().then((newUser) => {
          done(null, newUser);
        });
      }
    });
}));
