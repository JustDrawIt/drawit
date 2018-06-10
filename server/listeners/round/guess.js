const { findGameWithJoinCode } = require('../../database/helpers');

module.exports = async ({ data, socket, io }) => {
  try {
    const { message, nickname, joinCode } = data;
    const game = await findGameWithJoinCode(joinCode);

    if (message.toLowerCase() === game.word) {
      if (!socket.hasGuessedCorrect) {
        socket.hasGuessedCorrect = true;
        game.players = game.players.map(player => (
          player.nickname === nickname
            ? { nickname, score: player.score + 1 }
            : player
        ));
        await game.save();

        io.in(joinCode).emit('round:correct_guess', { nickname, scores: game.players });
      }
    } else {
      io.in(joinCode).emit('round:incorrect_guess', { nickname, message });
    }
  } catch (error) {
    socket.emit('round:error', { error });
  }
};
