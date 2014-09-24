/**
* DB Init.
*/
var bookshelf = null;
var knexConfig = require('../knexfile');

module.exports = function() {

  if ( !bookshelf ) {
    var connection;
    var env = process.env.NODE_ENV.toLowerCase();

    if ( env === 'development' ) {
      connection = knexConfig.development.connection;
    } else {
      connection = knexConfig.staging.connection;
    }

    bookshelf = require('bookshelf')(require('knex')({
      client: 'pg',
      debug: true,
      connection: connection
    }));
  }

  return bookshelf;
};


