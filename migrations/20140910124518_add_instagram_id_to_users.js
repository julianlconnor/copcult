'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.integer('instagram_id').unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('instagram_id');
  });
};
