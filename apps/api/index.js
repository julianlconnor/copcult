var app = require('express')();

app.post('/api/v1/search', require('./handlers/search'));

module.exports = app;
