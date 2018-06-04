const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const PROD = process.env.NODE_ENV === 'production';
const DEV = !PROD;
const LOG_PATH = path.join(__dirname, 'logs/access.log');

module.exports = {
  MONGODB: process.env.MONGODB,
  PORT: process.env.PORT || 8080,
  PUBLIC_PATH: path.resolve(__dirname, '../public'),
  MORGAN_OPTS: {
    stream: PROD ? fs.createWriteStream(LOG_PATH, { flags: 'a' }) : undefined,
  },
  HISTORY_OPTS: { verbose: DEV },
};
