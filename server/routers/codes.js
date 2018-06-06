const express = require('express');
const { findGameWithJoinCode } = require('../database/helpers');

const codes = express.Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};


codes.post('/', authCheck, (req, res) => {
  const { joinCode } = req.body;
  findGameWithJoinCode(joinCode)
    .then(game => res.send({ valid: !!game, error: null }))
    .catch(error => res.status(500).send({ error }));
});

module.exports = codes;
