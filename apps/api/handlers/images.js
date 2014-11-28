var url = require('url');
var Bookshelf = require('bookshelf');

var Image = require('../models/image');
var ImageUser = require('../models/image_user');

module.exports = {

  get: function(req, res) {
    new Image().fetchAll().then(function(collection) {
      res.json({
        data: collection.toJSON()
      });
    }).catch(function() {
      console.error('An error occurred while fetching all images.');
    });
  },

  getOne: function(req, res) {
    var imageId = req.param('imageId');

    new Image({
      id: escape(imageId)
    }).fetch({
      withRelated: ['users', 'items']
    }).then(function(image) {
      return res.json({ data: image.toJSON() });
    }).catch(function(err) {
      console.error(err);
      res.send(500, 'Unable to find image.');
    });
  },

  post: function(req, res) {
    /**
    * Takes an instagram url, parses out id, fetches for more info, saves
    * image.
    */
    var image;
    var userId = req.param('userId');
    var shortUrl = req.param('shortUrl');

    if ( !/^(http:\/\/|https:\/\/)/.test(shortUrl) ) {
      shortUrl = 'https://' + shortUrl;
    }

    /**
    * TODO: refactor this asap lol
    */
    shortUrl = url.parse(shortUrl).path.match(/\/p\/(.*)\//)[1];

    image = new Image({ shortUrl: shortUrl });
    image.findOrCreate()
      .then(function(image) {
        return image.fetchViaShortCode();
      })
      .then(function(data) {
        /**
        * TODO: wrap this in a transaction.
        */
        image.set(Image.parseImageData(data));
        return image.save().then(function() {
          return new ImageUser({
            user_id: userId,
            image_id: image.get('id')
          }).findOrCreate();
        }).then(function() {
          res.json({ data: image.toJSON() });
        });
      })
      .catch(function(err) {
        console.error('There was an error fetching the image from instagram.', err);
        res.send(500);
      });
  }

};
