const db = require('./database');

const findGameWithJoinCode = joinCode => db.Game.findOne({ joinCode });

exports.findGameWithJoinCode = findGameWithJoinCode;
