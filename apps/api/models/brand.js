var BaseModel = require('./base');
var Item = require('./item');

var Brand = BaseModel.extend({

  tableName: 'brands',
  hasTimestamps: ['created_at', 'updated_at'],

  hasMany: function() {
    return this.hasMany(Item);
  }

});

module.exports = Brand;
