'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('items_storefronts', function(table) {
    table.increments('id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('items_storefronts', function(table) {
    table.dropColumn('id');
  });
};
