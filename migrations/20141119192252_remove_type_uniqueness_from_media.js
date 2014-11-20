'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.raw('ALTER TABLE media DROP CONSTRAINT media_type_unique');
};

exports.down = function(knex, Promise) {
  return knex.schema.raw('ALTER TABLE media ADD CONSTRAINT media_type_unique UNIQUE (type)');
};
