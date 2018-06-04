const express = require('express');
const history = require('connect-history-api-fallback');
const { PATH, IS_DEV } = require('../config');
const gamesRouter = require('./games');

module.exports = (app) => {
  app.use(gamesRouter);
  app.use(history({ verbose: IS_DEV }));
  app.use(express.static(PATH));
};
