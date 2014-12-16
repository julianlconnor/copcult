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
    var debug = false;

    if ( process.env.TESTING ) {
      connection = knexConfig.test.connection;
    } else {
      env = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
      if ( env === 'development' ) {
        debug = true;
        connection = knexConfig.development.connection;
      } else {
        connection = knexConfig.staging.connection;
      }
    }

    try {
      knex = require('knex')({
        client: 'pg',
        debug: debug,
        connection: connection
      });
      bookshelf = require('bookshelf')(knex);
      bookshelf.plugin('registry');
    } catch (err) {
      console.error('There was an error connecting.', err);
    }
  }

  return {
    knex: knex,
    bookshelf: bookshelf
  };
};


