const mongoose = require('mongoose');
const { MONGODB } = require('../config');

mongoose.connect(MONGODB);

const db = mongoose.connection;
db.on('error', () => console.error('connection error'));
db.once('open', () => console.log('connected to db'));

const gameSchema = mongoose.Schema({
  joinCode: String,
  timePerRound: Number,
  maxPlayers: Number,
  maxRounds: Number,
  players: [String],
});

const Game = mongoose.model('Game', gameSchema);

module.exports.Game = Game;
