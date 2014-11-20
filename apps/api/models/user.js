var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

var BaseModel = require('./base');
var Image = require('./image');

var User = BaseModel.extend({

  tableName: 'users',
  hasTimestamps: ['created_at', 'updated_at'],

  images: function() {
    return this.belongsToMany(Image);
  },

  fetchFeatured: function() {
    /**
    * TODO: implement functionality for fetching featured users.
    */
    return this.fetchAll();
  },

  fetchFeed: function() {
    var url = 'https://api.instagram.com/v1/users/self/feed?access_token=' + this.get('instagramAccessToken');

    return request(url).then(function(resp) {
      var response = resp[0];
      var feed = JSON.parse(response.body).data;

      return feed;
    });
  }

});

module.exports = User;
