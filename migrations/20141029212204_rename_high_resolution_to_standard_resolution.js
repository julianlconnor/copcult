'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('media', function (table) {
    table.renameColumn('high_resolution', 'standard_resolution');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('media', function (table) {
    table.renameColumn('standard_resolution', 'high_resolution');
  });
};
