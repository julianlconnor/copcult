var app = require('express')();


/**
* Search Handlers
*/
var search = require('./handlers/search');

app.post('/search', search.post);


/**
* User Handlers
*/
var users = require('./handlers/users');

app.get('/users', users.getAll);
app.post('/users', users.post);

/**
* Storefront Handlers
*/
var storefronts = require('./handlers/storefronts');

app.get('/storefronts', storefronts.getAll);
app.get('/storefronts/:storefrontId', storefronts.getOne);
app.post('/storefronts', storefronts.post);
app.delete('/storefronts/:storefrontId/items/:itemId', storefronts.deleteItem);

/**
* Item Handlers
*/
var items = require('./handlers/items');

app.post('/items', items.post);

module.exports = app;
