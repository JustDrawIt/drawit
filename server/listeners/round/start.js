const randomWord = require('../../random-word');
const { updateGameRound, resetGameWord } = require('../../database/helpers');
const { GAME } = require('../../config');

const { TIME_PER_ROUND, WAIT_AFTER_ROUND_ENDS } = GAME;

const startRound = ({ data, socket, io }) => {
  const { joinCode } = data;
  const { sockets } = io.sockets;
  const room = Object.values(sockets).filter(playerSocket => joinCode in playerSocket.rooms);

  if (room.length <= 1) {
    socket.emit('round:not_started', { error: 'There must be at least 1 other player to start the game.' });
  } else if (!socket.isAdmin) {
    socket.emit('round:not_started', { error: 'Only the admin can start the game.' });
  } else {
    let hasntDrawn = room.filter(playerSocket => !playerSocket.hasDrawn);

    if (hasntDrawn.length <= 0) {
      room.forEach(playerSocket => playerSocket.hasDrawn = false);
      hasntDrawn = room;
    }

    const randomPlayerIndex = Math.floor(Math.random() * hasntDrawn.length);
    const randomPlayer = room[randomPlayerIndex];

    randomWord()
      .then(word => updateGameRound(joinCode, word))
      .then(({ word }) => {
        randomPlayer.hasDrawn = true;
        randomPlayer.emit('round:chosen', { word });
        io.in(joinCode).emit('round:started');

        setTimeout(() => {
          resetGameWord(joinCode)
            .then(({ roundsPlayed, maxRounds, players }) => {
              if (roundsPlayed >= maxRounds) {
                io.in(joinCode).emit('game:end', { word, scores: players });
              } else {
                io.in(joinCode).emit('round:end', { word, scores: players });
                setTimeout(() => {
                  room.forEach(playerSocket => playerSocket.hasGuessedCorrect = false);
                  io.in(joinCode).emit('round:cleared');
                  startRound({ data, socket, io });
                }, WAIT_AFTER_ROUND_ENDS);
              }
            })
            .catch(error => socket.emit('round:not_started', { error: error.message }));
        }, TIME_PER_ROUND);
      })
      .catch(error => socket.emit('round:not_started', { error: error.message }));
  }
};

module.exports = startRound;
