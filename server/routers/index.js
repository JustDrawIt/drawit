const express = require('express');
const { PATH } = require('../config');
const gamesRouter = require('./games');

module.exports = (app) => {
  app.use(express.static(PATH));
  app.use(gamesRouter);
};
