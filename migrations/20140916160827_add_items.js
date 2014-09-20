'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', function(table) {
    table.increments('id');
    table.timestamps();

    table.integer('brand_id'); // TODO: join with brand model

    table.string('name');
    table.string('image');
    table.string('url');
    table.string('price'); // TODO: make this into a big int, price in pennies
    table.string('slug');
  }).createTable('brands', function(table) {
    table.increments('id');
    table.timestamps();

    table.string('name').unique().index();
    table.string('image');
    table.string('website');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items')
                    .dropTable('brands');
};
