var checkit = require('checkit');
var BaseModel = require('./base');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));


var rules = {
  email: ['required', 'email'],
  username: ['required', 'alphaNumeric'],
  password: ['required']
};

var User = BaseModel.extend({

  tableName: 'users',
  hasTimestamps: ['created_at', 'updated_at'],

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
    if ( !email || !password ) {
      throw new Error('Email and password are both required');
    }

    return new this({ email: email.toLowerCase().trim() }).fetch({ require: true }).tap(function(user) {
      return bcrypt.compareAsync(user.get('password'), password);
    });
  })
  
});

module.exports = User;
