const express = require('express');
const passport = require('passport');
const passportSetup = require('../passport');

const authCallBack = express.Router();

authCallBack.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/games');
});

module.exports = authCallBack;
