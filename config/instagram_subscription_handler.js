var url = require('url');
var _ = require('underscore');
var Promise = require('bluebird');
var request = require('request');

var settings = require('./settings')();

var INSTAGRAM_LIST_SUBSCRIPTIONS = 'https://api.instagram.com/v1/subscriptions?' +
                                   'client_secret=' + settings.oauth.instagram.clientSecret +
                                   '&client_id=' + settings.oauth.instagram.clientID;

function subscribe() {
  /**
  * Subscribe to the tag feed.
  */
  var subscriptionUrl = 'https://api.instagram.com/v1/subscriptions';

  return new Promise(function(resolve, reject) {
    return request.post(subscriptionUrl, { 
      form: {
        client_id: settings.oauth.instagram.clientID,
        client_secret: settings.oauth.instagram.clientSecret,
        aspect: 'media',
        object: 'tag',
        object_id: 'copmoda',
        callback_url: url.resolve('http://37216c4d.ngrok.com', '/api/v1/realtime')
      }
    }, function(err, response, body) {
      if ( err ) {
        return reject(err);
      }
      
      console.log(body);
      return resolve(JSON.parse(body));
    });

  });
}

function instagramSubscriptionHandler() {
  /**
  * 1. Check subscriptions.
  * 2. Create tag subscription if doesn't exist.
  */
  var request = Promise.promisify(require('request'));

  return request(INSTAGRAM_LIST_SUBSCRIPTIONS).then(function(arr) {
    var response = arr[0];
    var subscriptions = JSON.parse(response.body).data;

    console.log('subscriptions', _.map(subscriptions, function(subscription) {
      return subscription.object_id;
    }));

    var subscribed = !!_.filter(subscriptions, function(sub) {
      return sub.object === 'tag' &&
             sub.object_id === 'copmoda';
    }).length;

    if ( !subscribed ) {
      return subscribe().then(function(response) {
        console.log('subscribed', response);
      });
    } else {
      return Promise.resolve();
    }
  });

}

module.exports = instagramSubscriptionHandler;
