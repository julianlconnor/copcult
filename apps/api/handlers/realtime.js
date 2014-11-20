var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

var settings = require('../../../config/settings')();
var Image = require('../models/image');

module.exports = {

  get: function(req, res) {
    var hubChallenge = req.param('hub.challenge');
    res.send(200, hubChallenge);
  },

  post: function(req, res) {
    /**
    * A new '#copmoda' tag was posted on instagram.
    *
    * Find most recent comments containing #copmoda and post them into feed.
    * Eventually we'll need to find another way to live update all tags as they come into instagram.
    */
    console.log('Update received', req.body);
    
    /**
    * TODO: maybe wrap this in process.nextTick?
    */
    req.body.forEach(function(update) {
      if ( update.object_id === 'blessed' ) {
        Image.findRecentByTag();
      }
    });

    res.send(200);
  },

  listSubscriptions: function(req, res) {
    var subscriptionUrl = 'https://api.instagram.com/v1/subscriptions?client_secret=' + settings.oauth.instagram.clientSecret +
                                                                    '&client_id=' + settings.oauth.instagram.clientID;
    return request(subscriptionUrl).then(function(response) {
      var data = JSON.parse(response[0].body).data;
      res.send(200, data);
    });
  }

};
