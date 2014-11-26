'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('images_items', function(table) {
    table.integer('image_id').index().references('images.id');
    table.integer('user_id').index().references('users.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('images_items');
};
