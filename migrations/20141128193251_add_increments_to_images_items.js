'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('images_items', function(table) {
    table.increments();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('images_items', function(table) {
    table.removeColumn('id');
  });
};
