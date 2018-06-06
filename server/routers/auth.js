const express = require('express');
const passport = require('passport');
const passportSetup = require('../passport');
const cookieSession = require('cookie-session');

const auth = express.Router();

auth.get('/google', passport.authenticate('google', {
  scope: ['profile'],
}));

module.exports = auth;
