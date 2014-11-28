'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('images_items', function(table) {
    table.integer('image_id').index().references('images.id');
    table.integer('item_id').index().references('items.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('images_items');
};
