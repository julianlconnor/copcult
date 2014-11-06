var Media = require('../models/media');

module.exports = {
  get: function(req, res) {
    new Media().fetchAll().then(function(collection) {
      res.json({
        data: collection.toJSON()
      });
    }).catch(function() {
      console.error('An error occurred while fetching all media items.');
    });
  }
};
