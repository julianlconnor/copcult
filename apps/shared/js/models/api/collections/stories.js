define([
  'q',
  'shared/js/models/collections/base',
  'shared/js/models/api/story',
  'shared/js/helpers/ajax',
  'shared/js/helpers/dev_api_url',
  'shared/js/helpers/constants'
], function(q, BaseCollection, Story, ajax, devApiUrl, constants) {

  var FEED_FILTERS = constants.FEED_FILTERS;

  var Stories = BaseCollection.extend({
    model: Story,

    initialize: function(models, options) {
      // if there is a user provided get stories from users endpoint, else stories
      options = options || {};
      this.url = devApiUrl();
      if ( options.user ) {
        this.user = options.user;
        this.url +=  '/v1/users/' + this.user.get('id') + '/stories';
      } else {
        this.url += '/v1/stories';
      }

      if ( options.filter ) {
        this.filter = options.filter;
      }

      this._nextUrl = this.url;
    },

    /**
     * Fetches new stories
     */
    fetchNewStories: function() {
      if ( !this._newestId ) {
        return;
      }

      var data = {}; // api decides what kind of data to return
      data.after = this._newestId;
      if ( this.filter ) {
        data.filter = this.filter;
      }

      return ajax({
        url: this.url,
        addToken: true,
        method: 'GET',
        data: data
      }).then(function(resp) {
        this.set(resp, { parse: true, remove: false });
      }.bind(this));
    },

    /**
    * Fetches the next page, and sets the URL of the next page of data based on
    * the response's paging hash.
    */
    fetchNextPage: function() {
      if ( this.hasNextPage() ) {
        var data = {};
        if ( this.filter ) {
          data.filter = this.filter;
        }

        return ajax({
          url: this._nextUrl,
          withCredentials: true,
          method: 'GET',
          data: data
        }).then(function(resp) {
          if ( resp.data.length ) {
            this._newestId = resp.data[0].id;
          }

          if ( resp.pagination && resp.pagination.next ) {
            this._nextUrl = resp.pagination.next;
          } else {
            this._nextUrl = null;
          }

          this.set(resp, { parse: true, remove: false });
        }.bind(this));
      } else {
        return q.reject();
      }
    },

    hasNextPage: function() {
      return !!this._nextUrl;
    },

    fetch: function() {
      var data = {};
      if ( this.filter ) {
        data.filter = this.filter;
      }

      return ajax({
        url: this.url,
        withCredentials: true,
        method: 'GET',
        data: data
      }).then(function(resp) {
        this.set(resp, { parse: true });
      }.bind(this)).catch(function(err) {
        this.handleServerSideError(err);
      }.bind(this));
    },

    handleServerSideError: function(err) {
    },

    parse: function(resp) {
      var attrs = this._super(resp) || {};

      /**
      * Filter out stories with type transfer.
      */
      return _.filter(attrs, function(story) {
        return story.data.type === 'payment';
      });
    }
  });

  return Stories;
});
