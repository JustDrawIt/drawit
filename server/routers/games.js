const express = require('express');
const shortid = require('shortid');
const helpers = require('../database/helpers');
const db = require('../database/database');

const games = express.Router();

games.post('/', function(req, res){
  // start game with options from the database
  // respond with the join code
  // const roundTime = req.body.timePerRound;
  // const maxPlayers = req.body.maxPlayers;
  // const maxRounds = req.body.maxRounds;
  const newGame = new db.Game



  res.send(shortid.generate());
})

module.exports = games;
