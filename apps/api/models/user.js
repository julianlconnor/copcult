var checkit = require('checkit');
var bookshelf = require('../../../config/bookshelf')();
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));


var rules = {
  email: ['required', 'email'],
  username: ['required', 'alphaNumeric'],
  password: ['required']
};

var User = bookshelf.Model.extend({

  tableName: 'users',
  hasTimestamps: ['createdAt', 'updatedAt'],

  /**
  * Instance methods.
  */
  initialize: function() {
    this.on('saving', this.validateSave);
  },

  validateSave: function() {
    /**
    * Hijack pw and bcrypt it.
    */
    return checkit(rules).run(this.attributes);
  }

}, {
  /**
  * Static methods.
  */
  login: Promise.method(function(email, password) {
    if (!email || !password) throw new Error('Email and password are both required');
    return new this({email: email.toLowerCase().trim()}).fetch({require: true}).tap(function(customer) {
      return bcrypt.compareAsync(customer.get('password'), password);
    });
  })
  
});

module.exports = User;
