'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('images', function (table) {
    table.string('short_url').index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('images', function (table) {
    table.dropColumns('short_url');
  });
};
