const onJoin = require('./join');
const onChat = require('./chat');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('join', data => onJoin({ data, socket, io }));
    socket.on('chat', data => onChat({ data, socket, io }));
  });
};
