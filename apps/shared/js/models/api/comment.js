define([
  'q',
  'shared/js/models/base',
  'shared/js/models/api/user',
  'shared/js/helpers/dev_api_url',
  'shared/js/helpers/ajax'
], function(q, BaseModel, User, devApiUrl, ajax) {

  var Comment = BaseModel.extend({
    /**
     * {
     *   date_created: "2014-05-09T20:45:53.838000",
     *   message: "",
     *   id: "",
     *   user: {
     *     username: "",
     *     first_name: "",
     *     last_name: "",
     *     display_name: "",
     *     about: "",
     *     profile_picture_url: "",
     *     id: "",
     *     date_joined: "2011-09-09T00:30:51"
     *   }
     * }
     */

    url: function() {
      if ( this.get('storyId') && this.get('id') ) {
        return devApiUrl() + '/v1/stories/' + this.get('storyId') + '/comments' + '/' + this.get('id');
      } else if ( this.get('id') ) {
        return devApiUrl() + '/v1/comments/' + this.get('id');
      } else if ( this.get('storyId') ) {
        return devApiUrl() + '/v1/stories/' + this.get('storyId') + '/comments';
      }
    },

    defaults: {
      message: ''
    },

    validation: {
      message: {
        required: true
      },
      storyId: {
        required: true
      }
    },

    parse: function(rsp) {
      var attrs = this._super(rsp) || {};
      if ( attrs.user ) {
        attrs.user = new User(attrs.user, { parse: true });
      }

      return attrs;
    },

    save: function() {
      this.validate();

      if ( !this.isValid() ) {
        return q.reject(this.handleSaveError(this.validationError));
      }

      var data = {
        message: this.get('message')
      };

      return ajax({
        type: 'POST',
        withCredentials: true,
        url: this.url(),
        data: this.serialize(data)
      })
      .then(function(payload) {
        this.set(this.parse(payload));
        return this;
      }.bind(this))
      .catch(this.handleServerSideError);
    },

    handleSaveError: function(error) {
      return error;
    },

    destroy: function() {
      return ajax({
        type: 'DELETE',
        withCredentials: true,
        url: devApiUrl() + '/v1/comments/' + this.get('id'),
      })
      .then(function(payload) {
        this.set(this.parse(payload));
        return this;
      }.bind(this))
      .catch(this.handleServerSideError);
    }
  });

  return Comment;

});


