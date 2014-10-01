'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('items', function (table) {
    table.string('currency');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('items', function (table) {
    table.dropColumn('currency');
  });
};
