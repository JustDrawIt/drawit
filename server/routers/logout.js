const express = require('express');

const logout = express.Router();

logout.get('/', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = logout;
