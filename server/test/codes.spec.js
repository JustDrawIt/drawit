const request = require('request');
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
    const json = { joinCode };
    request.post(API, { json }, (_, response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.valid).to.exist;
      expect(response.body.error).to.be.null;
      expect(response.body.valid).to.equal(true);

      done();
    });
  });

  it('should respond with error when given an incorrect join code', (done) => {
    const json = { joinCode: 'notajoincode' };
    request.post(API, { json }, (_, response) => {
      expect(response.statusCode).to.equal(500);
      expect(response.body.valid).to.not.exist;
      expect(response.body.error).to.not.be.null;
      expect(response.body.error).to.be.a('string');

      done();
    });
  });
});
