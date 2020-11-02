const express = require('express');
const server = express();

const facebookAuth = require('./facebookAuth');
const googleAuth = require('./googleAuth');


server.use(express.json());
server.use('/test', facebookAuth);
server.use('/google', googleAuth);


module.exports = server;