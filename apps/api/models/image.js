var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

var settings = require('../../../config/settings')();
var constants = require('../../../config/constants');

var BaseModel = require('./base');
var ImageItem = require('./image_item');

var Image = BaseModel.extend({

  tableName: 'images',
  hasTimestamps: ['created_at', 'updated_at'],

  users: function() {
    /**
    * TODO: refactor this to use a factory.
    * https://github.com/tgriesser/bookshelf/wiki/Plugin:-Model-Registry
    */
    return this.belongsToMany(require('./user'));
  },

  items: function() {
    /**
    * TODO: refactor this to use a factory.
    * https://github.com/tgriesser/bookshelf/wiki/Plugin:-Model-Registry
    */
    return this.belongsToMany(require('./item'));
  },

  comments: function() {
    return this.hasMany(require('./comment'));
  },

  fetchViaShortCode: function() {
    var clientID = settings.oauth.instagram.clientID;
    var url = 'https://api.instagram.com/v1/media/shortcode/' + this.get('shortCode') + '?client_id=' + clientID;

    console.log(url);
    return request(url).then(function(response) {
      var data = JSON.parse(response[0].body).data;
      console.log('data returned from insta', response);
      return data;
    });
  },

  fetchRecentlyAdded: function() {
    return this.query(function(qb) {
      return qb.orderBy('created_at', 'desc').limit(15);
    }).fetchAll({
      withRelated: ['users', 'items', 'comments']
    });
  },

  fetchRecentlyTagged: function() {
    return new ImageItem().query(function(qb) {
      return qb.orderBy('updated_at', 'desc').whereNotNull('updated_at').limit(15);
    }).fetchAll().then(function(imageItems) {
      var imageIds = imageItems.map(function(imageItem) {
        return imageItem.get('imageId');
      });

      return imageIds;
    }).then(function(imageIds) {
      return this.query(function(qb) {
        return qb.whereIn('id', imageIds);
      }).fetchAll();
    }.bind(this));
  }

}, {
  
  parseImageData: function(data) {
    console.log('data', data);
    var caption = '';
    if ( data.caption && data.caption.text ) {
      caption = data.caption.text;
    }

    return {
      type: constants.TYPE_INSTAGRAM,
      foreignId: data.id,
      link: data.link,
      caption: caption,
      thumbnail: data.images.thumbnail.url,
      lowResolution: data.images.low_resolution.url,
      standardResolution: data.images.standard_resolution.url
    };
  }
});

module.exports = Image;
