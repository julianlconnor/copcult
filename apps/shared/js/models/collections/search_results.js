define([
  'jquery',
  'q',
  'shared/js/helpers/dev_api_url',
  'shared/js/models/collections/base',
  'shared/js/models/api/user'
], function($, q, devApiUrl, BaseCollection, User) {

  var SearchResults = BaseCollection.extend({

    model: User,

    url: devApiUrl() + '/v1/users',

    search: function(query) {
      query = query.trim();

      if ( !query.length ) {
        this.reset([]);
        return q.reject();
      }

      var params = {
        query: query,
        offset: 0,
        limit: 30 // default max
      };

      return this.fetch({ reset: true, data: params })
        .then(function() {
          return this.toArray();
        }.bind(this));
    }

  });

  return SearchResults;
});

