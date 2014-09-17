var app = require('express')();

app.post('/search', require('./handlers/search').post);

app.get('/users', require('./handlers/users').getAll);
app.post('/users', require('./handlers/users').post);

app.get('/storefronts/:storefrontId', require('./handlers/storefronts').get);
app.post('/storefronts', require('./handlers/storefronts').post);

module.exports = app;
