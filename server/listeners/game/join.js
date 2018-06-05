const { addPlayerToGame } = require('../../database/helpers');

module.exports = ({ data, socket, io }) => {
  const { nickname, joinCode, isAdmin } = data;

  addPlayerToGame(joinCode, nickname)
    .then((savedGame) => {
      socket.nickname = nickname;
      socket.isAdmin = isAdmin;
      socket.hasDrawn = false;

      socket.join(joinCode, () => io.in(joinCode).emit('round:joined', { nickname }));
    })
    .catch(error => socket.emit('round:not_joined', { error }));
};
