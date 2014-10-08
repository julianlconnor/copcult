'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.raw('ALTER TABLE users ADD CONSTRAINT unique_instagram_id UNIQUE (instagram_id)');
};

exports.down = function(knex, Promise) {
  return knex.schema.raw('ALTER TABLE users DROP CONSTRAINT unique_instagram_id');
};
