const axios = require('axios');
const shortid = require('shortid');
const { expect } = require('chai');
const { Game } = require('../database/database');
const { PORT } = require('../config');

const API = `http://localhost:${PORT}/codes`;

describe('/codes router', () => {
  let joinCode;

  beforeEach(async () => {
    joinCode = shortid.generate();

    await new Game({
      joinCode,
      players: [],
      timePerRound: 60000,
      maxPlayers: 5,
      maxRounds: 5,
    }).save();
  });

  afterEach(async () => Game.findOneAndRemove({ joinCode }));

  it('should accept post requests and return if the joinCode is valid', (done) => {
    axios.post(API, { joinCode }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.data.valid).to.exist;
      expect(response.data.error).to.be.null;
      expect(response.data.valid).to.equal(true);

      done();
    });
  });

  it('should respond with error when given an incorrect join code', (done) => {
    axios.post(API, { joinCode: 'notajoincode' }).catch(({ response }) => {
      expect(response.status).to.equal(500);
      expect(response.data.valid).to.not.exist;
      expect(response.data.error).to.not.be.null;
      expect(response.data.error).to.be.a('string');

      done();
    });
  });
});
