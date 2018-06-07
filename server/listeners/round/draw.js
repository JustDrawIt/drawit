module.exports = ({ data, socket, io }) => {
  const { item, joinCode } = data;
  socket.to(joinCode).emit('round:drew', { item });
};
