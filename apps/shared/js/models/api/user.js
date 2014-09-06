define([
  'jquery',
  'underscore',
  'shared/js/models/base',
  'shared/js/helpers/ajax',
  'shared/js/helpers/dev_api_url',
  'shared/js/helpers/constants',
  'shared/js/models/formatters/user',
], function($, _, BaseModel, ajax, devApiUrl, constants, UserFormatter) {

  var FRIEND_REQUEST_STATUSES = constants.FRIEND_REQUEST_STATUSES;
  var FRIEND_REQUEST_ACTIONS = constants.FRIEND_REQUEST_ACTIONS;

  var TRUST_REQUEST_STATUSES = constants.TRUST_REQUEST_STATUSES;
  var TRUST_REQUEST_ACTIONS = constants.TRUST_REQUEST_ACTIONS;

  var UserModel = BaseModel.extend({

    attrs: {
      'id': 'user_id',
      'firstName': 'firstname',
      'lastName': 'lastname'
    },

    url: function() {
      return devApiUrl() + '/v1/users/' + (this.get('username') || this.getId());
    },

    fetch: function(qs) {
      qs = qs || {};

      return ajax({
        method: 'GET',
        url: this.url(),
        data: qs,
        withCredentials: true
      }).then(function(resp) {
        this.set(this.parse(resp));
      }.bind(this)).then(function() {
        return this;  // some nice sugar <3
      }.bind(this));
    },

    getFriendRequestStatus: function() {
      var friendRequest = this.get('friendRequest');
      if ( friendRequest && friendRequest.status ) {
        return friendRequest.status;
      }
    },

    getTrustRequestStatus: function() {
      var trustRequest = this.get('trustRequest');
      if ( trustRequest && trustRequest.status ) {
        return trustRequest.status;
      }
    },

    isFriend: function() {
      return this.getFriendRequestStatus() === FRIEND_REQUEST_STATUSES.COMPLETED;
    },

    hasSentFriendRequest: function() {
      return this.getFriendRequestStatus() === FRIEND_REQUEST_STATUSES.OUTGOING;
    },

    hasRecievedFriendRequest: function() {
      return this.getFriendRequestStatus() === FRIEND_REQUEST_STATUSES.INCOMING;
    },

    acceptFriendRequest: function() {
      return this.updateFriendshipRequest(FRIEND_REQUEST_ACTIONS.ACCEPT);
    },

    ignoreFriendRequest: function() {
      // you can only ignore incoming requests
      return this.updateFriendshipRequest(FRIEND_REQUEST_ACTIONS.IGNORE);
    },

    cancelFriendRequest: function() {
      // you can only cancel a request you made
      return this.updateFriendshipRequest(FRIEND_REQUEST_ACTIONS.CANCEL);
    },

    isTrusted: function() {
      return this.getTrustRequestStatus() === TRUST_REQUEST_STATUSES.COMPLETED;
    },

    hasSentTrustRequest: function() {
      return this.getTrustRequestStatus() === TRUST_REQUEST_STATUSES.OUTGOING;
    },

    hasRecievedTrustRequest: function() {
      return this.getTrustRequestStatus() === TRUST_REQUEST_STATUSES.INCOMING;
    },

    acceptTrustRequest: function() {
      return this.updateTrustRequest(TRUST_REQUEST_ACTIONS.ACCEPT);
    },

    ignoreTrustRequest: function() {
      return this.updateTrustRequest(TRUST_REQUEST_ACTIONS.IGNORE);
    },

    cancelTrustRequest: function() {
      return this.updateTrustRequest(TRUST_REQUEST_ACTIONS.CANCEL);
    },

    requestFriendship: function() {
      return ajax({
        method: 'POST',
        url: devApiUrl() + '/v1/friend-requests',
        withCredentials: true,
        data: {
          'user_id': this.get('id')
        }
      }).then(function(resp) {
        this.set('friendRequest', resp.data);
      }.bind(this));
    },

    updateFriendshipRequest: function(action) {
      return ajax({
        method: 'PUT',
        url: devApiUrl() + '/v1/friend-requests',
        withCredentials: true,
        data: {
          'user_id': this.get('id'),
          'action': action
        }
      }).then(function(resp) {
        this.set('friendRequest', resp.data);
      }.bind(this));
    },

    unfriend: function() {
      return ajax({
        method: 'DELETE',
        url: devApiUrl() + '/v1/friend-requests',
        withCredentials: true,
        data: {
          'user_id': this.get('id'),
        }
      }).then(function(resp) {
        this.set('friendRequest', resp);
      }.bind(this));
    },

    requestTrust: function() {
      return ajax({
        method: 'POST',
        url: devApiUrl() + '/v1/trust-requests',
        withCredentials: true,
        data: {
          'user_id': this.get('id')
        }
      }).then(function(resp) {
        this.set('trustRequest', resp.data);
      }.bind(this));
    },

    updateTrustRequest: function(action) {
      return ajax({
        method: 'PUT',
        url: devApiUrl() + '/v1/trust-requests',
        withCredentials: true,
        data: {
          'user_id': this.get('id'),
          'action': action
        }
      }).then(function(resp) {
        this.set('trustRequest', resp.data);
      }.bind(this));
    },

    untrust: function() {
      return ajax({
        method: 'DELETE',
        url: devApiUrl() + '/v1/trust-requests',
        withCredentials: true,
        data: {
          'user_id': this.get('id'),
        }
      }).then(function(resp) {
        this.set('trustRequest', resp);
      }.bind(this));
    },

    parse: function(resp) {
      var attrs = this._super(resp) || {};

      /**
      * Strip internal ID.
      */
      attrs.id = attrs.externalId || attrs.id;
      delete attrs.externalId;

      return attrs;
    }
  },
  {
    isPageUser: function(userOne, userTwo) {
      var matchingIDs = userOne.id === userTwo.id;
      var matchingExternalIDs = userOne.getId() === userTwo.getId();

      return matchingIDs || matchingExternalIDs;
    }
  });

  _.extend(UserModel.prototype, UserFormatter);

  return UserModel;
});

