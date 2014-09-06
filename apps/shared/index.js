var express = require('express');
var app = module.exports = express();

app.use('/shared/', express.static(__dirname));

module.exports = app;

