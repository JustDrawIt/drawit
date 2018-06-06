const express = require('express');
const passport = require('passport');
const passportSetup = require('../passport');

const authCallBack = express.Router();

authCallBack.get('/google', passport.authenticate('google'), (req, res) => {
  res.send('you reached callback URI');
});

