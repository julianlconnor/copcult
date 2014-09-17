var Storefront = require('../models/storefront');
var ItemStorefront = require('../models/item_storefront');

var Promise = require('bluebird');

/**
* Endpoint to create a storefront.
*
* A storefront is an association between an instagram post and several items.
*/
module.exports = {

  get: function(req, res) {
    var storefrontId = req.param('storefrontId');

    if ( !storefrontId ) {
      res.send(500, 'Unable to find storefront.');
    }

    return new Storefront({
      storefrontId: storefrontId
    }).fetch().then(function(storefront) {
      res.json(storefront.toJSON());
    }, function() {
      res.send(500, 'Unable to find storefront.');
    }).catch(console.error);
  },

  post: function(req, res) {
    var items = req.param('items');
    var instagramMediaID = req.param('instagramMediaID');

    return new Storefront({
      instagramMediaId: instagramMediaID
    })
    .findOrCreate()
    .then(function(storefront) {
      var storefrontId = storefront.get('id');

      return Promise.all(items.map(function(itemId) {

        /**
        * TODO: change this to sql EXISTS
        */
        return new ItemStorefront({
          itemId: itemId,
          storefrontId: storefrontId
        }).findOrCreate();
      }));
    })
    .then(function() {
      /**
      * TODO: Return storefront json.
      */
      res.send(200, 'wap');
    })
    .catch(console.error);
  }

};
