var Checkit = require('checkit');

var BaseModel = require('./base');
var Brand = require('./brand');
var Brand = require('./item');

var rules = new Checkit({
  url: ['required', 'url']
});

var Item = BaseModel.extend({

  tableName: 'items',
  hasTimestamps: ['created_at', 'updated_at'],

  initialize: function() {
    this.on('saving', this.validateSave);
  },

  validateSave: function() {
    return rules.run(this.attributes);
  },

  brand: function() {
    return this.belongsTo(Brand);
  },

  images: function() {
    return this.belongsToMany(Item);
  }

});

module.exports = Item;

