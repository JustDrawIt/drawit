const onGameJoin = require('./game-join');
const onRoundStart = require('./round-start');
const onRoundGuess = require('./round-guess');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('game:join', data => onGameJoin({ data, socket, io }));
    socket.on('round:start', data => onRoundStart({ data, socket, io }));
    socket.on('round:guess', data => onRoundGuess({ data, socket, io }));
  });
};
