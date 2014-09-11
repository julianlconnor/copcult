'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('instagram_access_token');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.dropColumn('instagram_access_token');
  });
};
