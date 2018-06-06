const { Game } = require('./database');

const findGameWithJoinCode = joinCode => Game.findOne({ joinCode })
  .then(game => game || Promise.reject(`There are no games with the join code: ${joinCode}`))

const addPlayerToGame = (joinCode, nickname) => findGameWithJoinCode(joinCode).then((game) => {
  if (game.players.find(player => player.nickname === nickname)) {
    return Promise.reject('Nickname is already used.');
  } else if (game.players.length >= game.maxPlayers) {
    return Promise.reject('The maximum amount of players has been reached.');
  }
  game.players.push({ nickname });
  return game.save();
});

const createGame = data => new Game(data).save().catch(() => Promise.reject('Something went wrong when creating a new game.'))

exports.findGameWithJoinCode = findGameWithJoinCode;
exports.addPlayerToGame = addPlayerToGame;
exports.createGame = createGame;
