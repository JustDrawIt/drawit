const express = require('express');
const passport = require('passport');

const auth = express.Router();

auth.get('/google', passport.authenticate('google', {
  scope: ['profile'],
}));

auth.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/games');
});

module.exports = auth;
