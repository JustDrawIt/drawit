const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('cookie-session');
const { User } = require('../database/database');
const { SESSION_OPTS, GOOGLE_KEYS } = require('../config');

module.exports = (app) => {
  app.use(session(SESSION_OPTS));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(error => done(error));
  });

  passport.use(new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: GOOGLE_KEYS.CLIENT_ID,
    clientSecret: GOOGLE_KEYS.CLIENT_SECRET,
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
      .then(currentUser => currentUser || new User({
        username: profile.displayName,
        googleId: profile.id,
      }).save())
      .then(user => done(null, user))
      .catch(error => done(error));
  }));
};
