const gamesRouter = require('./games');

module.exports = (app) => {
  app.use(gamesRouter);
};
