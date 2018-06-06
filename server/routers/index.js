const gamesRouter = require('./games');
const codesRouter = require('./codes');
const authRouter = require('./auth');

module.exports = (app) => {
  app.use('/games', gamesRouter);
  app.use('/codes', codesRouter);
  app.us('/auth', authRouter);
};
