const mongoose = require('mongoose');
const { MONGODB } = require('../config');

mongoose.connect(MONGODB);

const db = mongoose.connection;
db.on('error', () => console.error('connection error'));
db.once('open', () => console.log('connected to db'));

const gameSchema = mongoose.Schema({
  joinCode: String,
  players: [String],
  word: String,
  roundsPlayed: {
    type: Number,
    default: 0,
  },
  timePerRound: {
    type: Number,
    default: 10000,
  },
  maxPlayers: {
    type: Number,
    default: 4,
  },
  maxRounds: {
    type: Number,
    default: 6,
  },
});

const Game = mongoose.model('Game', gameSchema);

module.exports.Game = Game;
