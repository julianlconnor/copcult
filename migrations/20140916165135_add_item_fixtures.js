'use strict';

var Item = require('../apps/api/models/item');
var Brand = require('../apps/api/models/brand');

var Bluebird = require('bluebird');

exports.up = function(knex, Promise) {
  return new Brand({
    name: 'Zanerobe',
    image: 'http://lxschuslqu11e9td3pnztu9z8.wpengine.netdna-cdn.com/wp-content/uploads/2013/08/zanerobe-logo.jpg',
    website: 'https://www.zanerobe.com'
  }).save().then(function(zanerobe) {
    var items = [
      new Item({
        brand_id: zanerobe.id,
        name: 'Lineback White',
        slug: 'lineback-white',
        image: 'http://lxschuslqu11e9td3pnztu9z8.wpengine.netdna-cdn.com/wp-content/uploads/2014/07/ZNRB_ZANEROBE_100_MONO_0077.jpg',
        url: 'http://zanerobe.com/product/lineback-white/',
        price: '59.95'
      }).save(),
      new Item({
        brand_id: zanerobe.id,
        name: 'Cube White',
        slug: 'cube-white',
        image: 'http://lxschuslqu11e9td3pnztu9z8.wpengine.netdna-cdn.com/wp-content/uploads/2014/07/ZNRB_ZANEROBE_100_MONO_0077.jpg',
        url: 'http://zanerobe.com/product/cube-white/',
        price: '49.95'
      }).save(),
      new Item({
        brand_id: zanerobe.id,
        name: 'Tall Tee - Black Acid',
        slug: 'tall-tee-black-acid',
        image: 'http://lxschuslqu11e9td3pnztu9z8.wpengine.netdna-cdn.com/wp-content/uploads/2014/07/ZNRB_ZANEROBE_142_MONO_0156.jpg',
        url: 'http://zanerobe.com/product/tall-tee-black-acid/',
        price: '39.95'
      }).save()
    ];

    return Bluebird.all([items]);
  });
};

exports.down = function(knex, Promise) {
  return Bluebird.all([
    new Brand({
      name: 'Zanerobe'
    }).fetch().destroy(),
    new Item({
      name: 'Lineback White'
    }).fetch().destroy(),
    new Item({
      name: 'Cube White'
    }).fetch().destroy(),
    new Item({
      name: 'Tall Tee - Black Acid'
    }).fetch().destroy()
  ]);
};
