var BaseModel = require('./base');
var Item = require('./item');

var Storefront = BaseModel.extend({

  tableName: 'storefronts',
  hasTimestamps: ['created_at', 'updated_at'],

  items: function() {
    return this.belongsToMany(Item);
  }

});

module.exports = Storefront;
