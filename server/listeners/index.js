const onJoin = require('./join');
const onRoundStart = require('./round-start');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('join', data => onJoin({ data, socket, io }));
    socket.on('round:start', data => onRoundStart({ data, socket, io }));
  });
};
