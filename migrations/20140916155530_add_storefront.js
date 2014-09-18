'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('storefronts', function (table) {
    table.increments('id');
    table.timestamps();

    table.integer('user_id');

    table.integer('instagram_media_id');
    table.text('instagram_media_caption');
    table.string('instagram_media_image_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('storefronts');
};
