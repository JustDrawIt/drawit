module.exports = ({ data, socket, io }) => {
  const { mouseX, mouseY, joinCode } = data;
  socket.to(joinCode).emit('round:drew', { mouseX, mouseY });
};
