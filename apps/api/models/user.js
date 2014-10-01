var BaseModel = require('./base');
var Storefront = require('./storefront');

var Promise = require('bluebird');

var User = BaseModel.extend({

  tableName: 'users',
  hasTimestamps: ['created_at', 'updated_at'],

  storefronts: function() {
    return this.hasMany(Storefront);
  },

  fetchFeatured: function() {
    /**
    * TODO: implement functionality for fetching featured users.
    */
    return this.fetchAll();
  }

});

module.exports = User;
