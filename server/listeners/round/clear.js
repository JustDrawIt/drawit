module.exports = ({ data, socket, io }) => {
  const { joinCode } = data;
  socket.to(joinCode).emit('round:cleared');
};
