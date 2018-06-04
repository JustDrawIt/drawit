const express = require('express');
const shortid = require('shortid');
const helpers = require('../database/helpers');
const db = require('../database/database');

const games = express.Router();

games.post('/', (req, res) => {

  const { timePerRound, maxPlayers, maxRounds } = req.body;
  const joinCode = shortid.generate();
  const newGame = new db.Game({
    timePerRound,
    maxRounds,
    maxPlayers,
    joinCode,
  });

  newGame.save((err) => {
    if (err) {
      console.error(err);
      res.send({ error: 'something went wrong saving the game to the database'});
    }
    //save
    res.send({ joinCode });
  });
});

module.exports = games;
