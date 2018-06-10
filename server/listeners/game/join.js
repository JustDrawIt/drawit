const { addPlayerToGame } = require('../../database/helpers');

module.exports = ({ data, socket, io }) => {
  const { nickname, joinCode, isAdmin } = data;

  addPlayerToGame(joinCode, nickname)
    .then((game) => {
      socket.nickname = nickname;
      socket.isAdmin = isAdmin;
      socket.hasDrawn = false;

      socket.join(joinCode, () => io.in(joinCode).emit('game:joined', { game, nickname }));
    })
    .catch(error => socket.emit('game:not_joined', { error: error.message }));
};
