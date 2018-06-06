const gamesRouter = require('./games');
const codesRouter = require('./codes');
const authRouter = require('./auth');
const authCallBack = require('./authCallBack');

module.exports = (app) => {
  app.use('/games', gamesRouter);
  app.use('/codes', codesRouter);
  app.use('/auth', authRouter);
  app.use('/auth', authCallBack);
};
