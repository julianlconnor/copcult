var Image = require('../models/image');

module.exports = {
  get: function(req, res) {
    new Image().fetchAll().then(function(collection) {
      res.json({
        data: collection.toJSON()
      });
    }).catch(function() {
      console.error('An error occurred while fetching all images.');
    });
  }
};
