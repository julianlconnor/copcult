'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', function(table) {
    table.increments('id');
    table.timestamps();

    table.string('brand'); // TODO: join with brand model
    table.string('name');
    table.string('image');
    table.string('url');
    table.string('price'); // TODO: make this into a big int, price in pennies
    table.string('slug');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
