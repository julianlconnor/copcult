'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('comments', function(table) {
    table.integer('user_id').references('users.id').index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('comments', function(table) {
    table.dropColumn('user_id');
  });
};
