define([
  'q',
  'jquery',
  'shared/js/models/collections/base',
  'shared/js/models/api/user'
], function(q, $, BaseCollection, User) {

  var friends = null;

  var Friends = BaseCollection.extend({

    model: User,

    url: function() {
      return '/api/v5/friends';
    },

    isMatch: function(searchWords, user) {
      var first = user.get('firstName').toLowerCase();
      var last = user.get('lastName').toLowerCase();

      for (var i = 0; i < searchWords.length; i++) {
        if ( first.indexOf(searchWords[i]) !== 0 &&
             last.indexOf(searchWords[i]) !== 0 ) {
          return false;
        }
      }

      return true;
    },

    // Attempt at emulating iOS:
    // https://github.braintreeps.com/venmo/venmo-iphone-2/blob/master/VenmoIOS/Venmo/FriendsTableViewController.m#L178
    search: function(search) {
      search = search.toLowerCase().trim();

      var results = [];
      var searchWords = search.split(/\s+/);

      if ( !search ) {
        results = [];
      } else {
        results = this.filter(this.isMatch.bind(this, searchWords));
      }

      return results;
    }

  },
  {
    fetchCurrentFriends: function() {
      if ( friends ) {
        return q(friends);
      } else {
        friends = new Friends();
        return friends.fetch().then(function() {
          return friends;
        });
      }
    }
  });

  return Friends;
});

