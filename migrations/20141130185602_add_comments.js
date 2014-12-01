'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table) {
    table.increments();
    table.timestamps();
    table.text('text');
    table.integer('image_id').references('images.id').index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
