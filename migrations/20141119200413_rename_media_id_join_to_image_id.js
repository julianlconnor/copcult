'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('images_users', function(table) {
    table.renameColumn('media_id', 'image_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('images_users', function(table) {
    table.renameColumn('image_id', 'media_id');
  });
};
