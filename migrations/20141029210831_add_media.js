'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('media', function (table) {
    table.increments('id');
    table.string('type').unique();
    table.string('foreign_id').unique();

    table.string('thumbnail');
    table.string('low_resolution');
    table.string('high_resolution');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('media');
};
