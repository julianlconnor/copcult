var Item = require('../models/item');

module.exports = {
  post: function(req, res) {
    /**
    * TODO: sanitize
    */
    var url = req.param('url');

    new Item({
      url: url
    }).save().then(function(item) {
      res.json(item.toJSON());
    });
  }
};
