module.exports = ({ data, socket, io }) => {
  const { nickname, message } = data;
  console.log(nickname, message);
};
