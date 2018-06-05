const { findGameWithJoinCode } = require('../database/helpers');

module.exports = ({ data, socket, io }) => {
  const { nickname, joinCode, isAdmin } = data;

  findGameWithJoinCode(joinCode)
    .then((game) => {
      if (game) {
        socket.nickname = nickname;
        socket.isAdmin = isAdmin;
        socket.hasDrawn = false;

        socket.join(joinCode);
        io.in(joinCode).emit('joined', `${nickname} just joined!`);
      } else {
        socket.emit('not_joined', { error: `There are no games with join code: ${joinCode}` });
      }
    })
    .catch(() => socket.emit('not_joined', { error: `Something went wrong when querying for game with join code: ${joinCode}` }));
};
