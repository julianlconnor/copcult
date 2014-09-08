/**
* DB Init.
*/
var bookshelf = null;

module.exports = function() {

  if ( !bookshelf ) {
    var knex = require('knex')({
      client: 'sqlite3',
      connection: {
        filename: './mydb.sqlite'
      }
    });
    bookshelf = require('bookshelf')(knex);
  }

  return bookshelf;
};


