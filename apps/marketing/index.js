var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(process.cwd(), 'build/marketing/')));
app.use('/marketing/', express.static(path.join(__dirname)));

module.exports = app;

