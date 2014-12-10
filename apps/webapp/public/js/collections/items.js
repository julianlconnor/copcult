var BaseCollection = require('./base');

var Item = require('../models/item');

var Items = BaseCollection.extend({
  model: Item
});

module.exports = Items;
