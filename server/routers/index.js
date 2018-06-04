const gamesRouter = require('./games');
const codesRouter = require('./codes');

module.exports = (app) => {
  app.use('/games', gamesRouter);
  app.use('/codes', codesRouter);
};
