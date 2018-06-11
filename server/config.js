const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const LOG_PATH = path.join(__dirname, 'logs/access.log');
const PROD = process.env.NODE_ENV === 'production';
const DEV = !PROD;

module.exports = {
  MONGODB: process.env.MONGODB,
  PORT: process.env.PORT || 8080,
  PUBLIC_PATH: path.resolve(__dirname, '../public'),
  MORGAN_OPTS: {
    stream: PROD ? fs.createWriteStream(LOG_PATH, { flags: 'a' }) : undefined,
  },
  HISTORY_OPTS: { verbose: DEV },
  SESSION_OPTS: {
    secret: process.env.SESSION_SECRET || 'sea creature',
    cookie: {
      maxAge: 86400000, // 24 hours
    },
  },
  GOOGLE_KEYS: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  GAME: {
    TIME_PER_ROUND: 90000,
    WAIT_AFTER_ROUND_ENDS: 15000,
  },
};
