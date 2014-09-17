var BaseModel = require('./base');
var Storefront = require('./storefront');

var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));

var User = BaseModel.extend({

  tableName: 'users',
  hasTimestamps: ['created_at', 'updated_at'],

  storefronts: function() {
    return this.hasMany(Storefront);
  }

}, {

  /**
  * Static methods.
  */
  login: Promise.method(function(email, password) {
    if ( !email || !password ) {
      throw new Error('Email and password are both required');
    }

    return new this({ email: email.toLowerCase().trim() }).fetch({ require: true }).tap(function(user) {
      return bcrypt.compareAsync(user.get('password'), password);
    });
  })

});

module.exports = User;
