var Storefront = require('../models/storefront');
var ItemStorefront = require('../models/item_storefront');

var Promise = require('bluebird');

/**
* Endpoint to create a storefront.
*
* A storefront is an association between an instagram post and several items.
*/
module.exports = {

  getOne: function(req, res) {
    /**
    * Get more info on one storefront.
    */
    var storefrontId = req.param('storefrontId');

    if ( storefrontId === null ||
         storefrontId === undefined ) {
      res.send(500, 'Unable to find storefront.');
    }

    return new Storefront({
      id: storefrontId
    })
    .fetch({ withRelated: 'items' })
    .then(function(storefront) {
      res.json({
        data: storefront.toJSON()
      });
    }, function() {
      res.send(500, 'Unable to find storefront.');
    }).catch(console.error);
  },

  getAll: function(req, res) {
    /**
    * Fetch all storefronts associated with the provided user id.
    */
    var userId = req.param('userId');

    if ( userId === null ||
         userId === undefined ) {
      res.send(500, 'Invalid user id.');
    }

    return new Storefront({
      userId: userId
    }).fetchAll({
      withRelated: 'items'
    }).then(function(collection) {
      res.json({
        data: collection.toJSON()
      });
    }).catch(console.error);
  },

  post: function(req, res) {
    /**
    * Create a storefront.
    */
    var items = req.param('items');
    var userId = req.param('userId');

    var instagramMediaID = req.param('instagramMediaID');
    var instagramMediaImageUrl = req.param('instagramMediaImageUrl');
    var instagramMediaCaption = req.param('instagramMediaCaption');

    return new Storefront({
      userId: userId,
      instagramMediaId: instagramMediaID,
      instagramMediaImageUrl: instagramMediaImageUrl,
      instagramMediaCaption: instagramMediaCaption
    })
    .findOrCreate()
    .then(function(storefront) {
      var storefrontId = storefront.get('id');

      return Promise.all(items.map(function(itemId) {
        /**
        * TODO: change this to sql EXISTS
        * might want to use attach here
        * http://bookshelfjs.org/#Model-attach
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
