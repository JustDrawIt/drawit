const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const morgan = require('morgan');
const history = require('connect-history-api-fallback');

const setupRouters = require('./routers');
const setupListeners = require('./listeners');
const { PUBLIC_PATH, MORGAN_OPTS, HISTORY_OPTS } = require('./config');

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(morgan('combined', MORGAN_OPTS));
app.use(history(HISTORY_OPTS));
app.use(express.static(PUBLIC_PATH));

setupRouters(app);
setupListeners(io);

module.exports.server = server;
