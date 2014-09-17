'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('storefronts', function (table) {
    table.increments('id');
    table.timestamps();

    table.integer('user_id');
    table.integer('instagram_media_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('storefronts');
};
