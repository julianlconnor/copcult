#!/usr/bin/env node

var _ = require('lodash');
var Promise = require('bluebird');
var Bookshelf = require('bookshelf');

var Image = require('../apps/api/models/image');
var ImageUser = require('../apps/api/models/image_user');
var User = require('../apps/api/models/user');

var constants = require('../config/constants');

function addMedia(user, images) {
  /**
  * Given the images found containing a comment 'cop' by a user.
  *
  * Find or create it.
  *
  * Eventually we'll need to do more complicated things such as track which
  * users are looking for what photos.
  */
  if ( !images.length ) {
    return Promise.resolve();
  }

  return Promise.all(images.map(function(image) {
    
    // TODO: move this to media constructor
    var caption = '';
    if ( image.caption && image.caption.text ) {
      caption = image.caption.text;
    }

    return Bookshelf.transaction(function(t) {
      return new Image({
        type: constants.TYPE_INSTAGRAM,
        foreignId: image.id,
        link: image.link,
        caption: caption,
        thumbnail: image.images.thumbnail.url,
        lowResolution: image.images.low_resolution.url,
        standardResolution: image.images.standard_resolution.url
      }).findOrCreate({ transacting: t }).then(function(image) {
        /**
        * Create association between a user and a piece of image.
        */
        return new ImageUser({
          user_id: user.get('id'),
          image_id: image.get('id')
        }).findOrCreate({ transacting: t });
      });
    });
  }));
}

function parseFeedForComments(user, feed) {
  /**
  * Loop through items in feed.
  *
  * If item is an image, loop through its comments for a comment by our target user.
  */
  var instagramId = user.get('instagramId') + ''; // cast to str

  return new Promise(function(resolve) {
    var imagesToAdd = [];

    _.each(feed, function(feedItem) {

      if ( feedItem.type !== 'image' ) {
        return;
      }

      var comments = feedItem.comments.data;

      _.each(comments, function(comment) {
        var commentUser = comment.from;

        if ( commentUser.id !== instagramId ) {
          return;
        }

        if ( comment.text.indexOf('copmoda') === -1 ) {
          return;
        }

        if ( !imagesToAdd.length && !_.contains(imagesToAdd, feedItem.id) ) {
          imagesToAdd.push(feedItem);
        }
      }.bind(this));

    }.bind(this));

    resolve(imagesToAdd);
  }.bind(this));
}

/**
* Fetches user feeds and checks for comments that haven't yet been recorded.
*
* 1. Fetch users feed.
* 2. Parse each image for a comment made by the user.
* 3. If a comment exists, pull image into db.
* 4. Track min and max ids for user.
*/
// module.exports.start = function() {
return User.fetchAll().then(function(col) {
  return Promise.all(col.map(function(user) {
    return user.fetchFeed()
               .then(parseFeedForComments.bind(null, user))
               .then(addMedia.bind(null, user));
  }));
})
.then(function() {
  console.log('Successfully updated feeds.');
  process.exit(0);
})
.catch(function(err) {
  console.error('There was an error parsing user feeds.');
  throw err;
});
