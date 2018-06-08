const mongoose = require('mongoose');
const { MONGODB } = require('../config');

mongoose.connect(MONGODB);

const db = mongoose.connection;
db.on('error', () => console.error('The connection to database could not be established.'));
db.once('open', () => console.log('Connection to database established.'));

const userSchema = mongoose.Schema({
  username: String,
  googleId: String,
});

const User = mongoose.model('User', userSchema);

const gameSchema = mongoose.Schema({
  joinCode: String,
  players: [{
    nickname: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
  }],
  word: String,
  roundsPlayed: {
    type: Number,
    default: 0,
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
module.exports.User = User;
