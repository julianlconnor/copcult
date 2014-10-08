var path = require('path');
var knex = require(path.join(process.cwd(), 'config/bookshelf'))().knex;

// knex.raw('SET foreign_key_checks = 0;'),
//
//     knex.schema.dropTable('Address'),
//
//     knex.schema.dropTable('Member'),
//
//     knex.raw('SET foreign_key_checks = 1;')

module.exports = {

  rollback: function(done) {
    /**
    * TODO: catch errors and drop cascade entire db, fuck it, then try again.
    */
    knex.migrate.rollback().then(function() {
      done();
    });
  },

  latest: function(done) {
    knex.migrate.latest().then(function() {
      done();
    });
  }

};
