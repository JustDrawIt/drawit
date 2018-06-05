const { Game } = require('./database');

const findGameWithJoinCode = joinCode => Game.findOne({ joinCode });
const addPlayerToGame = (joinCode, player) => findGameWithJoinCode().then((game) => {
  if (!game) {
    return Promise.reject(`There are no games with the join code: ${joinCode}`);
  } else if (game.players.length < game.maxPlayers) {
    return Promise.reject('The maximum amount of players has been reached.');
  }
  game.players.push(player);
  return game.save();
});

exports.findGameWithJoinCode = findGameWithJoinCode;
exports.addPlayerToGame = addPlayerToGame;
