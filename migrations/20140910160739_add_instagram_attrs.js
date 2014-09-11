'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.text('instagram_bio');

    table.string('instagram_username');
    table.string('instagram_profile_website');
    table.string('instagram_profile_picture');

    table.integer('instagram_follows');
    table.integer('instagram_followers');
    table.integer('instagram_num_posts');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('instagram_bio');

    table.dropColumn('instagram_username');
    table.dropColumn('instagram_profile_website');
    table.dropColumn('instagram_profile_picture');

    table.dropColumn('instagram_follows');
    table.dropColumn('instagram_followers');
    table.dropColumn('instagram_num_posts');
  });
};
