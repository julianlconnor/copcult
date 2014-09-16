var BaseModel = require('./base');

var Item = BaseModel.extend({

  tableName: 'items',
  hasTimestamps: ['created_at', 'updated_at'],

});

module.exports = Item;

