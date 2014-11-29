'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('images', function(table) {
    table.renameColumn('short_url', 'short_code');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('images', function(table) {
    table.renameColumn('short_code', 'short_url');
  });
};
