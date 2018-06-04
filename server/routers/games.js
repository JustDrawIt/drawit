const express = require('express');
const helpers = require('../database/helpers');

const games = express.Router();

games.post('/', (req, res) => {
  console.log(req.body);
  const joinCode = 'joincode';
  res.send(joinCode);
});

module.exports = games;
