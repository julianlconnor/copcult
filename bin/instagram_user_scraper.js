var Promise = require('bluebird');

var User = require('../apps/api/models/user');
var Media = require('../apps/api/models/media');

var constants = require('../config/constants');

function addMedia(images) {
  /**
  * Given the images found containing a comment 'cop' by a user.
  *
  * Find or create it.
  *
  * Eventually we'll need to do more complicated things such as track which
  * users are looking for what photos.
  */
  return Promise.all(images.map(function(image) {
    return new Media({
      type: constants.TYPE_INSTAGRAM,
      foreignId: image.id,
      link: image.link,
      caption: image.caption.text,
      thumbnail: image.images.thumbnail.url,
      lowResolution: image.images.low_resolution.url,
      standardResolution: image.images.standard_resolution.url
    }).findOrCreate();
  }));
}

/**
* Fetches user feeds and checks for comments that haven't yet been recorded.
*
* 1. Fetch users feed.
* 2. Parse each image for a comment made by the user.
* 3. If a comment exists, pull image into db.
* 4. Track min and max ids for user.
*/
module.exports.start = function() {
  return User.fetchAll().then(function(col) {
    return Promise.all(col.map(function(user) {
      return user.searchForComments();
    }));
  }).then(addMedia).catch(function() {
    console.error('There was an error parsing user feeds.');
  });
};
