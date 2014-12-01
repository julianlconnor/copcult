'use strict';

exports.up = function(knex, Promise) {
 return knex.schema.raw('ALTER TABLE images ALTER COLUMN caption TYPE text');
};

exports.down = function(knex, Promise) {
 return knex.schema.raw('ALTER TABLE images ALTER COLUMN caption TYPE varchar(255)');
};
