var path = require('path');
var express = require('express');

var app = express();

app.use('/images/', express.static(path.join(__dirname, 'images')));

module.exports = app;
