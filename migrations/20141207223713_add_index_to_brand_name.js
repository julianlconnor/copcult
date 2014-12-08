'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.raw('CREATE INDEX brand_idx ON brands ((lower(name)));')
};

exports.down = function(knex, Promise) {
  return knex.schema.raw('DROP INDEX brand_idx;')
};
