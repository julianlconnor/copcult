var materialistic = require('materialistic');

var Item = require('../models/item');

module.exports = {
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
