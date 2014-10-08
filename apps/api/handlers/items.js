var materialistic = require('materialistic');

var Item = require('../models/item');

module.exports = {
  post: function(req, res) {
    /**
    * TODO: sanitize
    */
    var url = req.param('url');

    return materialistic(url).then(function(attrs) {
      return new Item(attrs).save().then(function(item) {
        res.json(item.toJSON());
      });
    }).catch(function(err) {
      console.error('An error occurred while scraping:', url, err);
    });
  }
};
