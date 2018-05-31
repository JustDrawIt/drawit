const express = require('express');
const path = require('path');

const server = express();
const PUBLIC = path.resolve(__dirname, '../public');

server.use(express.static(PUBLIC));

module.exports = server;
