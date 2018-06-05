const onJoin = require('./join');
const onStart = require('./start');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('join', data => onJoin({ data, socket, io }));
    socket.on('round:start', data => onStart({ data, socket, io }));
  });
};
