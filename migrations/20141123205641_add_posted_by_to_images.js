'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('images', function (table) {
    table.string('user_id').index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('images', function (table) {
    table.dropColumns('user_id');
  });
};
