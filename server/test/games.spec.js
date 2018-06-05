const request = require('request');
const { expect } = require('chai');
const { Game } = require('../database/database');
const { PORT } = require('../config');

const API = `http://localhost:${PORT}/games`;

describe('/games router', () => {
  it('should create a game on a post request', (done) => {
    const timePerRound = 300000;
    const maxPlayers = 5;
    const maxRounds = 10;
    const json = { timePerRound, maxPlayers, maxRounds };

    request.post(API, { json }, async (_, response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.error).to.be.null;
      expect(response.body.game).to.have.keys(['_id', '__v', 'roundsPlayed', 'timePerRound', 'maxPlayers', 'maxRounds', 'players', 'joinCode']);
      expect(response.body.game.timePerRound).to.equal(timePerRound);
      expect(response.body.game.maxPlayers).to.equal(maxPlayers);
      expect(response.body.game.maxRounds).to.equal(maxRounds);

      const gameQueriedById = await Game.findById(response.body.game._id);
      const gameQueriedByJoinCode = await Game.findOne({ joinCode: response.body.game.joinCode });

      expect(gameQueriedById).to.exist;
      expect(gameQueriedByJoinCode).to.exist;

      done();
    });
  });
});
