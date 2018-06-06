const express = require('express');
const passport = require('passport');

const auth = express.Router();

auth.get('/google', passport.authenticate('google', {
  scope: ['profile'],
}));
