const axios = require('axios');
const { expect } = require('chai');
const { Game } = require('../database/database');
const { PORT } = require('../config');

const API = `http://localhost:${PORT}/games`;

describe('/games router', () => {
  it('should redirect to login if not authenticated', (done) => {
    axios.post(API, {}).then(({ data }) => {
      expect(data).to.include('</html>');
      done();
    });
  });

  xit('should create a game on a post request', (done) => {
    const maxPlayers = 5;
    const maxRounds = 10;

    axios.post(API, { maxPlayers, maxRounds }).then(async ({ status, data }) => {
      expect(status).to.equal(200);
      expect(data.error).to.be.null;
      expect(data.game).to.have.keys(['_id', '__v', 'roundsPlayed', 'timePerRound', 'maxPlayers', 'maxRounds', 'players', 'joinCode']);
      expect(data.game.maxPlayers).to.equal(maxPlayers);
      expect(data.game.maxRounds).to.equal(maxRounds);

      const gameQueriedById = await Game.findById(data.game._id);
      const gameQueriedByJoinCode = await Game.findOne({ joinCode: data.game.joinCode });

      expect(gameQueriedById).to.exist;
      expect(gameQueriedByJoinCode).to.exist;

      done();
    });
  });
});
