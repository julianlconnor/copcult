'use strict';

/**
* This creates the join table between media and users.
*
* We'll need this in order to query for a users feed.
* e.g., grab me all media that this user has asked for DESC
*/

exports.up = function(knex, Promise) {
  return knex.schema.createTable('media_users', function(table) {
    table.increments('id');
    table.integer('media_id').index().references('media.id');
    table.integer('user_id').index().references('users.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('media_users');
};
