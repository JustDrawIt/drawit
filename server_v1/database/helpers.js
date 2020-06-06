const { Game } = require('./database');

const findGameWithJoinCode = joinCode => Game.findOne({ joinCode })
  .exec()
  .then(game => game || Promise.reject(new Error(`There are no games with the join code: ${joinCode}`)));

const updateGameRound = (joinCode, word) => Game.findOneAndUpdate({ joinCode }, {
  $set: { word },
  $inc: { roundsPlayed: 1 },
}, { new: true }).exec();

const resetGameWord = joinCode => Game.findOneAndUpdate({ joinCode }, {
  $set: {
    word: null,
  },
}, { new: true }).exec();

const addPlayerToGame = (joinCode, nickname) => findGameWithJoinCode(joinCode).then((game) => {
  if (game.players.find(player => player.nickname === nickname)) {
    return Promise.reject(new Error('Nickname is already used.'));
  } else if (game.players.length >= game.maxPlayers) {
    return Promise.reject(new Error('The maximum amount of players for this game has been reached.'));
  }
  game.players.push({ nickname });
  return game.save();
});

const createGame = data => new Game(data).save().catch(() => Promise.reject(new Error('Something went wrong when creating a new game.')));

exports.findGameWithJoinCode = findGameWithJoinCode;
exports.updateGameRound = updateGameRound;
exports.resetGameWord = resetGameWord;
exports.addPlayerToGame = addPlayerToGame;
exports.createGame = createGame;
