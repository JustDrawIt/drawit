const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
const passport = require('passport');
const cookieSession = require('cookie-session');

const setupRouters = require('./routers');
const setupListeners = require('./listeners');
const {
  PUBLIC_PATH,
  MORGAN_OPTS,
  HISTORY_OPTS,
  COOKIE_OPTS,
} = require('./config');

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(morgan('combined', MORGAN_OPTS));
app.use(cors());
app.use(bodyParser.json());
app.use(history(HISTORY_OPTS));
app.use(express.static(PUBLIC_PATH));
app.use(cookieSession(COOKIE_OPTS));
app.use(passport.initialize());
app.use(passport.session());

setupRouters(app);
setupListeners(io);

module.exports.server = server;
