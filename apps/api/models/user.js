var bookshelf = require('../../../config/bookshelf')();
//var Promise = require('bluebird');
//var bcrypt = Promise.promisifyAll(require('bcrypt'));

var User = bookshelf.Model.extend({
  tableName: 'users'
  /**
  * Instance methods.
  */
}, {
  /**
  * Static methods.
  */
});

module.exports = User;
