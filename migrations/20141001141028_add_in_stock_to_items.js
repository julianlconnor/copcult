'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('items', function (table) {
    table.string('in_stock');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('items', function (table) {
    table.dropColumn('in_stock');
  });
};
