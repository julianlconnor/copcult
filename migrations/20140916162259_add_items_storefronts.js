'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('items_storefronts', function(table) {
    table.increments('id');
    table.integer('item_id').index().references('items.id');
    table.integer('storefront_id').index().references('storefronts.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items_storefronts');
};
