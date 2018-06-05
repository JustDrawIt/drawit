const { addPlayerToGame } = require('../database/helpers');

module.exports = ({ data, socket, io }) => {
  const { nickname, joinCode, isAdmin } = data;

  addPlayerToGame(joinCode, nickname)
    .then((savedGame) => {
      socket.nickname = nickname;
      socket.isAdmin = isAdmin;
      socket.hasDrawn = false;

      socket.join(joinCode);
      io.in(joinCode).emit('joined', `${nickname} just joined!`);
    })
    .catch(error => socket.emit('not_joined', { error }));
};
