const express = require('express');
const shortid = require('shortid');
const { createGame } = require('../database/helpers');

const games = express.Router();

games.post('/', (req, res) => {
  const { timePerRound, maxPlayers, maxRounds } = req.body;
  const joinCode = shortid.generate();

  createGame({
    timePerRound,
    maxRounds,
    maxPlayers,
    joinCode,
  }).then(game => res.send({ game, error: null }))
    .catch(error => res.status(500).send({ error }));
});

module.exports = games;
