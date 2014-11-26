var materialistic = require('materialistic');

var Item = require('../models/item');
var ImageItem = require('../models/image_item');

module.exports = {
  post: function(req, res) {
    /**
    * TODO: sanitize
    */
    var url = req.param('url');
    var imageId = req.param('userId');

    return materialistic(url).then(function(attrs) {
      /**
      * TODO: wrap in transaction
      */
      return new Item(attrs).findOrCreate().then(function(item) {
        return new ImageItem({
          imageId: imageId,
          itemId: item.get('id')
        }).findOrCreate().then(function() {
          res.json({ data: item.toJSON() });
        });
      }).catch(function(err) {
        console.error('Error creating item and association with image', err);
        res.send(500);
      });
    }).catch(function(err) {
      console.error('An error occurred while scraping:', url, err);
      res.send(500);
    });
  }
};
