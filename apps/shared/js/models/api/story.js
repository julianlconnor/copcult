define([
  'q',
  'shared/js/helpers/ajax',
  'shared/js/helpers/dev_api_url',
  'shared/js/models/base',
  'shared/js/models/formatters/story',
  'shared/js/models/api/user',
  'shared/js/models/api/collections/comments',
  'shared/js/models/api/collections/payments',
  'shared/js/helpers/constants',
  'backbone.super'
], function(q, ajax, devApiUrl, BaseModel, StoryFormatter, User, Comments,
            Payments, constants) {

  var STORY_AUDIENCES = constants.STORY_AUDIENCES;

  var Story = BaseModel.extend({
    defaults: {
      likes: []
    },

    url: function() {
      return devApiUrl() + '/v1/stories/' + this.get('id');
    },

    parse: function(rsp) {
      var attrs = this._super(rsp) || {};
      if ( attrs.comments ) {
        attrs.comments = new Comments(attrs.comments, { parse: true });
      }

      if ( attrs.likes ) {
        attrs.likes = attrs.likes.data.map(function(user) {
          return new User(user, { parse: true });
        });
      }

      if ( attrs.type === 'payment' && attrs.payments ) {
        attrs.payments = new Payments(attrs.payments, { parse: true });
      }

      return attrs;
    },

    fetch: function() {
      return ajax({
        type: 'GET',
        withCredentials: true,
        url: this.url()
      }).then(function(rsp) {
        this.set(this.parse(rsp));
      }.bind(this));
    },

    getActor: function() {
      // actor is the initiator/subject of the story
      if ( this.get('type') === 'payment' && this.get('payments') ) {
        return this.get('payments').first().get('actor');
      }
    },

    getTargets: function() {
      if ( this.get('type') === 'payment' && this.get('payments') ) {
        return this.get('payments').map(function(payment) {
          return payment.get('target');
        });
      }
      return [];
    },

    /**
     * is the user a participant in this story?
     *
    * @param {User} user - an instance of api/user model
    *
    * returns {Boolean}
    **/
    hasUser: function(user) {
      var users = this.getTargets().concat(this.getActor());
      return users.filter(function(u) { return u.getId() === user.getId(); }).length > 0;
    },

    getNote: function() {
      if ( this.get('type') === 'payment' && this.get('payments') ) {
        return this.get('payments').first().get('note');
      }
    },

    getAmount: function() {
      if ( this.get('type') === 'payment' && this.get('payments') ) {
        return this.get('payments').first().get('amount');
      }
    },

    getAudience: function() {
      if ( this.get('type') === 'payment' && this.get('payments') ) {
        return this.get('payments').first().get('audience');
      }
    },

    likedByUser: function(user) {
      var userIsInLikes = this.get('likes').filter(function(u) {
        return u.getId() === user.getId();
      });

      return !!userIsInLikes.length;
    },

    toggleLike: function(user) {
      var method = this.likedByUser(user) ? 'DELETE' : 'POST';
      return ajax({
        type: method,
        withCredentials: true,
        url: this.url() + '/likes'
      }).then(function() {
        return this.fetch();
      }.bind(this));
    },

    /**
    * Allows a story to update its privacy setting. Will throw an error
    * and return a rejected promise if privacy is not in our privacy
    * whitelist.
    *
    * @param {String} privacy - Our desired privacy setting
    **/
    setPrivacy: function(privacy) {
      return ajax({
        type: 'PUT',
        withCredentials: true,
        url: this.url(),
        data: { audience: privacy }
      }).then(function(rsp) {
        this.set(this.parse(rsp));
      }.bind(this));
    }

  });

  _.extend(Story.prototype, StoryFormatter);

  return Story;

});
