const onJoin = require('./join');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('join', data => onJoin({ data, socket, io }));
  });
};
