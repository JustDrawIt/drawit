const express = require('express');
const shortid = require('shortid');
const authenticated = require('../passport/authenticated');
const { createGame } = require('../database/helpers');

const games = express.Router();

// games.post('/', authenticated, (req, res) => {
games.post('/', (req, res) => {
  const { maxPlayers, maxRounds } = req.body;
  const joinCode = shortid.generate();

  createGame({
    maxRounds,
    maxPlayers,
    joinCode,
  }).then(game => res.send({ game, error: null }))
    .catch(error => res.status(500).send({ error }));
});

module.exports = games;
