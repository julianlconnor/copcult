var Promise = require('bluebird');
var materialistic = require('materialistic');

var Item = require('../models/item');
var Brand = require('../models/brand');

module.exports = {

  put: function(req, res) {
    var itemId = req.param('itemId');

    var url = req.param('url');
    var name = req.param('name');
    var brand = req.param('brand');

    console.log('ITEM ID', itemId);
    return Promise.all([
      new Item({ id: itemId }).findOrCreate(),
      new Brand({ name: brand }).findOrCreate()
    ]).spread(function(item, brand) {
      return item.save({
        brandId: brand.id,
        url: url,
        name: name
      });
    }).then(function(item) {
      return item.fetch({
        withRelated: [ 'brand' ]
      }).then(function(item) {
        return res.json({
          data: item.toJSON()
        });
      });
    }).catch(function(err) {
      console.error('There was an error while updating item with ID: ', itemId, err);
      res.send(500);
    });
  },

  post: function(req, res) {
    /**
    * TODO: sanitize
    */
    var url = req.param('url');

    return materialistic(url).then(function(attrs) {
      /**
      * TODO: wrap in transaction
      */
      return new Item({ url: url }).findOrCreate().then(function(item) {
        return item.save(attrs).then(function(item) {
          res.json({ data: item.toJSON() });
        });
      }).catch(function(err) {
        console.error('Error creating item.', err);
        res.send(500);
      });
    }).catch(function(err) {
      console.error('An error occurred while scraping:', url, err);
      res.send(500);
    });
  }
};
