const express = require('express');
const server = express();

const authU = require('./auth');

server.use(express.json());
server.use('/test', authU);


module.exports = server;