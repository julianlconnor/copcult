'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('items_storefronts', function(table) {
    table.integer('item_id').index();
    table.integer('storefront_id').index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items_storefronts');
};
