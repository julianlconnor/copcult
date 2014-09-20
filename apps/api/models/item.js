var BaseModel = require('./base');
var Brand = require('./brand');

var Item = BaseModel.extend({

  tableName: 'items',
  hasTimestamps: ['created_at', 'updated_at'],

  brand: function() {
    return this.belongsTo(Brand);
  }

});

module.exports = Item;

