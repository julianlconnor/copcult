'use strict';

var Item = require('../apps/api/models/item');
var Bluebird = require('bluebird');

exports.up = function(knex, Promise) {
  return Bluebird.all([
    new Item({
      brand: 'Zanerobe',
      name: 'Lineback White',
      slug: 'lineback-white',
      image: 'http://lxschuslqu11e9td3pnztu9z8.wpengine.netdna-cdn.com/wp-content/uploads/2014/07/ZNRB_ZANEROBE_100_MONO_0077.jpg',
      url: 'http://zanerobe.com/product/lineback-white/',
      price: '59.95'
    }).save(),
    new Item({
      brand: 'Zanerobe',
      name: 'Cube White',
      slug: 'cube-white',
      image: 'http://lxschuslqu11e9td3pnztu9z8.wpengine.netdna-cdn.com/wp-content/uploads/2014/07/ZNRB_ZANEROBE_100_MONO_0077.jpg',
      url: 'http://zanerobe.com/product/cube-white/',
      price: '49.95'
    }).save(),
    new Item({
      brand: 'Zanerobe',
      name: 'Tall Tee - Black Acid',
      slug: 'tall-tee-black-acid',
      image: 'http://lxschuslqu11e9td3pnztu9z8.wpengine.netdna-cdn.com/wp-content/uploads/2014/07/ZNRB_ZANEROBE_142_MONO_0156.jpg',
      url: 'http://zanerobe.com/product/tall-tee-black-acid/',
      price: '39.95'
    }).save()
  ]);
};

exports.down = function(knex, Promise) {
  return Bluebird.all([
    new Item({
      brand: 'Zanerobe',
      name: 'Lineback White'
    }).fetch().destroy(),
    new Item({
      brand: 'Zanerobe',
      name: 'Cube White'
    }).fetch().destroy(),
    new Item({
      brand: 'Zanerobe',
      name: 'Tall Tee - Black Acid'
    }).fetch().destroy()
  ]);
};
