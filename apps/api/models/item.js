var Checkit = require('checkit');

var BaseModel = require('./base');
var Brand = require('./brand');

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

});

module.exports = Item;

