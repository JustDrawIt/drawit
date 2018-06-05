module.exports = ({ data, io }) => {
  // need to recieve joincode from data and emit this new messsage to only the correct room
  io.sockets.emit('chat', data);
};
