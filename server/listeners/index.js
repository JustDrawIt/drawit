const onJoin = require('./join');
<<<<<<< HEAD
const onChat = require('./chat');
=======
const onRoundStart = require('./round-start');
>>>>>>> 67e231cd8946cd5ec75e3a22d626964b20d25707

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('join', data => onJoin({ data, socket, io }));
<<<<<<< HEAD
    socket.on('chat', data => onChat({ data, socket, io }));
=======
    socket.on('round:start', data => onRoundStart({ data, socket, io }));
>>>>>>> 67e231cd8946cd5ec75e3a22d626964b20d25707
  });
};
