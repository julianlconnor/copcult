'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('images', function (table) {
    table.dropColumn('user_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('images', function (table) {
    table.string('user_id').index();
  });
};
