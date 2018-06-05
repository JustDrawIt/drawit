const shortid = require('shortid');
const { expect } = require('chai');
const { findGameWithJoinCode, addPlayerToGame, createGame } = require('../database/helpers');
const { Game } = require('../database/database');

describe('database helpers', () => {
  describe('games', () => {
    let newGame;
    let joinCode;

    beforeEach(async () => {
      joinCode = shortid.generate();
      newGame = await new Game({
        joinCode,
        players: [],
        timePerRound: 50000,
        maxPlayers: 5,
        maxRounds: 5,
      }).save();
    });

    after(async () => Game.deleteMany({}));

    describe('findGameWithJoinCode', () => {
      it('returns a game when given it\'s joinCode', async () => {
        const foundGame = await findGameWithJoinCode(joinCode);
        expect(foundGame).to.exist;
        expect(JSON.stringify(foundGame)).to.be.equal(JSON.stringify(newGame));
      });

      it('rejects when there are no games with the join code', (done) => {
        const randomCode = shortid.generate();
        findGameWithJoinCode(randomCode).catch((error) => {
          expect(error).to.exist;
          done();
        });
      });
    });

    describe('addPlayerToGame', () => {
      it('adds a player to a games players', async () => {
        const newPlayer = 'Bob';
        const savedGame = await addPlayerToGame(joinCode, newPlayer);
        expect(savedGame.players).to.contain(newPlayer);
      });

      it('rejects when the maximum amount of players has been reached', async () => {
        await Promise.all(new Array(newGame.maxPlayers)
          .fill(undefined)
          .map(() => addPlayerToGame(joinCode)));

        addPlayerToGame(joinCode).catch((error) => {
          expect(error).to.exist;
          expect(error).to.be.a('string');
        });
      });
    });

    describe('createGame', () => {
      it('should create a game', async () => {
        const createdJoinCode = shortid.generate();
        const createdGame = await createGame({
          joinCode: createdJoinCode,
          players: [],
          timePerRound: 50000,
          maxPlayers: 5,
          maxRounds: 5,
        });
        const foundGame = await Game.findById(createdGame._id);
        expect(foundGame).to.exist;
        expect(JSON.stringify(foundGame)).to.be.equal(JSON.stringify(createdGame));
      });
    });
  });
});

