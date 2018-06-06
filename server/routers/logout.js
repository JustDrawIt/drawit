const express = require('express');
const passport = require('passport');
const passportSetup = require('../passport');

const logout = express.Router();

logout.get('/', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = logout;
