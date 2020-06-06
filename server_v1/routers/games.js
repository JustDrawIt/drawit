const express = require('express');
const shortid = require('shortid');
const authenticated = require('../passport/authenticated');
const { findGameWithJoinCode, createGame } = require('../database/helpers');

const games = express.Router();

games.get('/', (req, res) => {
  const { joinCode } = req.query;

  findGameWithJoinCode(joinCode)
    .then(game => res.send({ game }))
    .catch(error => res.status(500).send({ error: error.message }));
});

games.post('/', authenticated, (req, res) => {
  const { maxPlayers, maxRounds } = req.body;
  const joinCode = shortid.generate();

  createGame({
    maxRounds,
    maxPlayers,
    joinCode,
  }).then(game => res.send({ game, error: null }))
    .catch(error => res.status(500).send({ error: error.message }));
});

module.exports = games;
