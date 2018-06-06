const express = require('express');
const shortid = require('shortid');
const { createGame } = require('../database/helpers');

const games = express.Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

games.post('/', authCheck, (req, res) => {
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
