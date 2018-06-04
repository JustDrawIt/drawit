const db = require('./database');

const findJoinCode = joinCode => db.Game.findOne({ joinCode });

exports.findJoinCode = findJoinCode;
