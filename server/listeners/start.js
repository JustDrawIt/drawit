const randomWord = require('random-word');
const { findGameWithJoinCode } = require('../database/helpers');

module.exports = ({ data, socket, io }) => {
  const { joinCode } = data;
  const { sockets } = io.sockets;
  const room = Object.values(sockets).filter(socket => !!socket.rooms[joinCode]);

  if (room.length <= 1) {
    socket.emit('not_started', { error: 'There must be at least 1 other player to start the game.' });
  } else if (!socket.isAdmin) {
    socket.emit('not_started', { error: 'Only the admin can start the game.' });
  } else {
    const hasntDrawn = room.filter(socket => !socket.hasDrawn);
    const randomPlayerIndex = Math.floor(Math.random() * hasntDrawn.length);
    const randomPlayer = room[randomPlayerIndex];
    const word = randomWord();

    findGameWithJoinCode(joinCode)
      .then((game) => {
        game.word = word;
        return game.save();
      })
      .then(() => {
        randomPlayer.hasDrawn = true;
        randomPlayer.emit('chosen', { word });

        io.in(joinCode).emit('started');
      })
      .catch(error => socket.emit('not_started', { error }));
  }
};
