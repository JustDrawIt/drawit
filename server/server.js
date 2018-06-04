const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const setupRouters = require('./routers');
const setupListeners = require('./listeners');

const app = express();
const server = http.Server(app);
const io = socketio(server);

setupRouters(app);
setupListeners(io);

module.exports.server = server;
