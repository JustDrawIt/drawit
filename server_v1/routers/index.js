const gamesRouter = require('./games');
const codesRouter = require('./codes');
const authRouter = require('./auth');
const logoutRouter = require('./logout');

module.exports = (app) => {
  app.use('/games', gamesRouter);
  app.use('/codes', codesRouter);
  app.use('/auth', authRouter);
  app.use('/logout', logoutRouter);
};
