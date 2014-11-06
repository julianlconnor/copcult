var _ = require('lodash');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

var BaseModel = require('./base');
var Storefront = require('./storefront');

var User = BaseModel.extend({

  tableName: 'users',
  hasTimestamps: ['created_at', 'updated_at'],

  storefronts: function() {
    return this.hasMany(Storefront);
  },

  fetchFeatured: function() {
    /**
    * TODO: implement functionality for fetching featured users.
    */
    return this.fetchAll();
  },

  searchForComments: function() {
    var url = 'https://api.instagram.com/v1/users/self/feed?access_token=' + this.get('instagramAccessToken');

    return request(url).then(function(resp) {
      var response = resp[0];
      var feed = JSON.parse(response.body).data;

      return this.parseFeedForComments(feed);
    }.bind(this));
  },

  parseFeedForComments: function(feed) {

    var instagramId = this.get('instagramId') + ''; // cast to str

    return new Promise(function(resolve) {
      var imagesToAdd = [];

      _.each(feed, function(feedItem) {

        /**
        * Only deal with images for now.
        */
        if ( feedItem.type !== 'image' ) {
          return;
        }

        var comments = feedItem.comments.data;

        _.each(comments, function(comment) {
          var commentUser = comment.from;

          if ( commentUser.id !== instagramId ) {
            return;
          }

          if ( comment.text.indexOf('copmoda') !== -1 ) {
            /**
            * Comment contains magic hashtag.
            *
            * Queue feeditem for storage.
            *
            * TODO: test to see if _.contains works as intended
            */
            if ( !imagesToAdd.length && !_.contains(imagesToAdd, feedItem.id) ) {
              imagesToAdd.push(feedItem);
            }
          }
        }.bind(this));

      }.bind(this));

      resolve(imagesToAdd);
    }.bind(this));
  }

});

module.exports = User;
