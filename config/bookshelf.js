/**
* DB Init.
*/
var knex = null;
var bookshelf = null;
var knexConfig = require('../knexfile');

module.exports = function() {

  if ( !bookshelf ) {
    var env;
    var connection;

    if ( process.env.TESTING ) {
      connection = knexConfig.test.connection;
    } else {
      env = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
      if ( env === 'development' ) {
        connection = knexConfig.development.connection;
      } else {
        connection = knexConfig.staging.connection;
      }
    }

    knex = require('knex')({
      client: 'pg',
      debug: true,
      connection: connection
    });
    bookshelf = require('bookshelf')(knex);
  }

  return {
    knex: knex,
    bookshelf: bookshelf
  };
};


