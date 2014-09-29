var Item = require('../models/item');

module.exports = {
  post: function(req, res) {
    /**
    * Return search fixtures for the time being.
    */
    return new Item()
      .fetchAll().then(function(collection) {
        res.json({
          data: collection.toJSON()
        });
      }, function(err) {
        res.send(500, err);
      });
  }
};
