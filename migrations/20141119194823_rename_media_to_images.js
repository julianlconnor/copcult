'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.renameTable('media', 'images')
                    .renameTable('media_users', 'images_users');
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable('images', 'media')
                    .renameTable('images_users', 'media_users');
};
