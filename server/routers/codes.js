const express = require('express');
const { findGameWithJoinCode } = require('../database/helpers');

const codes = express.Router();

codes.post('/', (req, res) => {
  const { joinCode } = req.body;
  findGameWithJoinCode(joinCode)
    .then(game => res.send({ valid: !!game, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

module.exports = codes;
