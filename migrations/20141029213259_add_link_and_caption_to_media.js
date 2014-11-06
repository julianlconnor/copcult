'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('media', function (table) {
    table.string('caption');
    table.string('link');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('media', function (table) {
    table.dropColumns('link', 'caption');
  });
};
