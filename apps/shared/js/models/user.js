define([
  'underscore',
  'backbone',
  'q',
  'jquery',
  'shared/js/models/base',
  'shared/js/helpers/regex',
  'shared/js/helpers/ajax',
  'shared/js/helpers/validations',
  'shared/js/models/formatters/user',
  'jquery.cookie'
], function(_, Backbone, q, $, BaseModel, regex, ajax, validations,
            UserFormatter) {

  // this can NOT be the right place for this state
  var currentUser = null;

  var UserModel = BaseModel.extend({
    /**
    * @class UserModel
    * @extends BaseModel
    */

    /**
    * @attribute firstName
    * @type String
    */

    /**
    * @attribute lastName
    * @type String
    */

    /**
    * @attribute email
    * @type String
    */

    /** params
    * @attribute password
    * @type String
    */

    /**
    * @attribute passwordConfirm
    * @type String
    */

    /**
    * @attribute phone
    * @type String
    */

    /**
    * @attribute facebookId
    * @type String
    */

    /**
    * @attribute facebookAccessToken
    * @type String
    */

    attrs: {
      'id': 'user_id',
      'firstName': 'firstname',
      'lastName': 'lastname'
    },

    urlRoot: '/api/v5/users',

    // NOTE: I'm not sure we want to override this.get('id') with externalId for interal api users
    // because the endpoints are expecting an internal id for now
    //idAttribute: 'externalId',

    validation: {
      firstName: {
        required: true,
        pattern: regex.name
      },
      lastName: {
        required: true,
        pattern: regex.name
      },
      email: {
        required: true,
        pattern: regex.email
      },
      phone: {
        required: true,
        fn: function(phone) {
          return !validations.isValidPhone(phone);
        }
      },
      password: {
        required: true,
        pattern: regex.password,
        msg: 'Please enter a password between 8 and 32 characters'
      }
    },

    save: function() {
      // the POST /api/v5/users (signup) endpoint wants first_name/last_name, while our GET
      // requests use firstname/lastname

      var options = {
        // add header for 'device-id', a value generated on server to keep track
        // of device making the request
        headers: { 'device-id': $.cookie('v_id') }
      };

      return this._super({
        'first_name': this.get('firstName'),
        'last_name': this.get('lastName'),
      }, options);
    },

    handleServerSideAttributeError: function(error) {
      if ( error.error_code === 104 && error.message.match(/phone/) ) {
        // error_code 104 is for 'Invalid parameter phone: You must enter a
        // valid, 10 digit, US phone number'
        this.validationError.phone = 'You must enter a valid, 10 digit, US phone number';
      }
    },

    verify: function(claim) {
      return Backbone.ajax({
        method: 'POST',
        url: this.url() + '/' + claim.verificationRoute(),
        data: {
          claim_id: claim.get('id'),
          claim_key: claim.get('key')
        },
        emulateJSON: true,
        contentType: 'application/x-www-form-urlencoded'
      });
    },

    login: function() {
      /**
      * Logs in via oauth consumer flow.
      */
      var data = {
        phoneEmailUsername: this.get('username'),
        password: this.get('password')
      };

      return ajax({
        url: '/w/login',
        type: 'POST',
        data: data
      }).then(this.parseLogin.bind(this));
    },

    parseLogin: function(payload) {
      this.set(this.parse({data: payload}));
    },

    setAccessTokenCookie: function() {
      $.cookie('api_access_token', this.get('accessToken'), { path: '/' });
    },

    createDjangoSession: function() {
      /**
      * Logs in via oauth consumer flow.
      */
      var data = {
        username: this.get('username') || this.get('email'),
        password: this.get('password'),
        return_json: true
      };

      return ajax({
        url: '/account/login',
        type: 'POST',
        emulateJSON: true,
        contentType: 'application/x-www-form-urlencoded',
        data: data
      }).then(this.parseDjangoLogin.bind(this));
    },

    parseDjangoLogin: function(payload) {
      payload.data = payload.venmo.data;
      delete payload.venmo;
      this.set(this.parse(payload));
    },

    forgotPassword: function() {
      var data = {
        phone_or_email: this.get('email')
      };

      return ajax({
        url: '/api/v5/users/forgot_password',
        type: 'POST',
        emulateJSON: true,
        contentType: 'application/x-www-form-urlencoded',
        data: data
      });
    },

    // get /me if no id is specified
    fetch: function(options) {
      options = options || {};
      if ( !this.id && !this.get('id') ) {
        options.url = '/api/v5/me';
      }

      return this._super(options);
    },

    sendCode: function() {
      var data = {
        phone : this.get('phone'),
        send_code : true
      };

      return ajax({
        url: '/api/v5/phones',
        method: 'PUT',
        emulateJSON: true,
        contentType: 'application/x-www-form-urlencoded',
        data: data
      });
    },

    getVerificationStatus: function() {
      return Backbone.ajax({
        url: '/api/v5/phones',
        method: 'GET'
      });
    },

    verifyPhoneWithCode: function(code) {
      if ( ! code ) {
        // 104 corresponds to the API response:
        // Invalid parameter pass one of send_code, code, or phone_claim_secret
        return q.reject({ errorMessage: 'Please provide a verification code', code: 104 });
      }

      var data = {
        code: code,
        phone: this.get('phone'),
        retry_verify: true
      };

      return ajax({
        url: '/api/v5/phones',
        method: 'PUT',
        emulateJSON: true,
        contentType: 'application/x-www-form-urlencoded',
        data: data
      });
    },

    verifyEmailViaMailgun: function(address) {
      return ajax({
        type: 'GET',
        url: 'https://api.mailgun.net/v2/address/validate?callback=?',
        data: { address: address, api_key: 'pubkey-7s4cuqzcna0drfplfb9v81zm604ycaw0' },
        dataType: 'jsonp',
        crossDomain: true
      });
    },

    // TODO: find a good abstraction for this :)
    savePhone: function(phone) {
      return ajax({
        url: '/api/v5/phones',
        method: 'POST',
        emulateJSON: true,
        contentType: 'application/x-www-form-urlencoded',
        data: {
          phone: phone
        }
      }).then(function() {
        this.set('phone', phone);
      }.bind(this));
    }
  },

  // --- static methods ---
  {
    // Fetch the current user, whether cached or from the API
    fetchCurrentUser: function() {
      if ( !currentUser ) {
        currentUser = new UserModel();
      }

      return currentUser.fetch().then(function() {
        return currentUser;
      });
    },

    // Get current user without fetching (also synchronous instead of a promise)
    getCurrentUser: function() {
      if ( currentUser ) {
        return currentUser;
      }
      throw new Error('No current user has been set!');
    },

    // Force refresh the current user
    refreshCurrentUser: function() {
      return currentUser.fetch().then(function() {
        return currentUser;
      });
    },

    // Manually set the current user (e.g. after signup)
    setCurrentUser: function(user) {
      currentUser = user;
    },

    // Logout the current user, doesn't need an instance.
    logout: function() {
      /**
      * TODO(julian): this csrf, xsrf, _csrf, _xsrf situation is silly. I need
      * to refactor it.
      */
      var expressLogout = ajax({
        url: '/w/logout',
        type: 'POST',
        data: {
          _csrf: venmo.csrf
        }
      });
      var djangoLogout = ajax({
        url: '/account/logout',
        type: 'GET'
      });

      return q.all([
        djangoLogout,
        expressLogout
      ]);
    },

    // Assert whether a given user matches the current logged in user
    isPageUser: function(userOne, userTwo) {
      var matchingIDs = userOne.id === userTwo.id;
      var matchingExternalIDs = userOne.get('externalId') === userTwo.get('externalId');

      return matchingIDs || matchingExternalIDs;
    }
  });

  _.extend(UserModel.prototype, UserFormatter);

  return UserModel;

});
