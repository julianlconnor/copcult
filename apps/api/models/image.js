var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

var settings = require('../../../config/settings')();
var constants = require('../../../config/constants');

var BaseModel = require('./base');

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

  fetchViaShortCode: function() {
    var clientID = settings.oauth.instagram.clientID;
    var url = 'https://api.instagram.com/v1/media/shortcode/' + this.get('shortUrl') + '?client_id=' + clientID;

    return request(url).then(function(response) {
      var data = JSON.parse(response[0].body).data;
      return data;
    });
  }

}, {
  
  parseImageData: function(data) {
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
