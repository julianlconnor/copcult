define([
  'backbone',
  'underscore',
  'q',
  'underscore.string',
  'backbone.super',
  'backbone.validation'
], function(Backbone, _, q, _s) {

  var BaseModel = Backbone.Model.extend({

    attrs: {},

    errorMessages: { },
    validators: { },

    VALIDATION_ERROR: 'Validation Error',

    sync: function(method, model, options) {
      /**
      * Wrapper around sync that allows us to display a loading indicator and
      * return Qified Promise.
      */
      var dfd;
      var attrs;

      if ( !options ) {
        options = {};
      }

      attrs = options.attrs ? options.attrs : this.attributes;

      options.attrs = this.serialize(attrs);
      options.attrs.client_id = 10;

      Backbone.trigger('spinner:start');
      dfd = q(Backbone.sync.call(this, method, model, options));
      dfd.finally(function() { Backbone.trigger('spinner:stop'); });

      return dfd;
    },

    /**
    * Wrapper around save that allows us to change the default behavior from
    * returning `False` on validation failure to a rejected deferred.
    */
    save: function(key, val, options) {

      // backbone.validate form
      if ( this.isValid(true) === false ) {
        return q.reject(new Error(this.VALIDATION_ERROR));
      }

      var dfd = this._super.call(this, key, val, options);

      // this._validate form
      if ( !dfd ) {
        return q.reject(new Error(this.VALIDATION_ERROR));
      }

      // Validation succeeded, wrap $.Deferred as a Q.js deferred.
      return q(dfd).then(null, this._handleServerSideErrors.bind(this));
    },

    saveForm: function(key, val, options) {
      /**
       * Wrapper around this.save that uses form data instead of serialized json
       */
      var attrs;

      if (key === null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({
        emulateJSON: true,
        processData: true,
        data: this.serialize(this.toJSON())
      }, options);

      var args = _.filter([key, attrs, options], function(item) {
        return item !== undefined;
      });

      return this.save.apply(this, args);
    },

    _handleServerSideErrors: function(err) {
      /*
      * Handler for validation errors that occured on the server rather than
      * client.
      */

      if ( !err.responseJSON ) {
        throw err;
      }

      var errors;

      if (err.responseJSON.data && err.responseJSON.data.error) {
        errors = err.responseJSON.data.error.errors ||
                 [err.responseJSON.data.error];
      } else if (err.responseJSON.error) {
        errors = [err.responseJSON.error];
      }

      this.validationError = {};
      _.each(errors, this.handleServerSideAttributeError, this);

      if ( !_.isEmpty(this.validationError) ) {
        // legacy for old baseForms/claim money
        this.trigger('invalid', this, this.validationError);

        // Add a special key to the error hash so listeners can have special
        // handling for server-side errors
        var errObj = _.extend({ _serverSide: true }, this.validationError);

        this.trigger('validated', false, this, errObj);
        this.trigger('validated:invalid', this, errObj);
        // TODO: should we set model._isValid here, i.e., should the model's state be changed?

        throw new Error(this.VALIDATION_ERROR);
      }

      throw err;
    },

    /**
    * Add a error message to validationErrors for each invalid attribute. The
    * error message comes from this model's errorMessages hash, not the server.
    *
    * @method handleServerSideAttributeError
    * @param {Object} error
    */
    handleServerSideAttributeError: function() {
      // noop, override in subclass
    },

    serialize: function(attrs) {
      attrs = _.clone(attrs);

      // map local attr names to API attr names
      _.each(this.attrs, function(api, localKey) {
        attrs[api] = attrs[localKey];
        delete attrs[localKey];
      });

      // convert camelCased attr names to underscored
      _.each(attrs, function(val, key) {
        var underscored = _s.underscored(key);
        if ( underscored !== key ) {
          attrs[underscored] = val;
          delete attrs[key];
        }
      });

      return attrs;
    },

    parse: function(response) {
      /**
      * Fallback onto response.
      */
      var attrs = _.clone(response.data || response);

      // map server attr names to local attr names
      _.each(this.attrs, function(apiKey, localKey) {
        if ( attrs[apiKey] !== undefined ) {
          attrs[localKey] = attrs[apiKey];
          delete attrs[apiKey];
        }
      });

      // convert underscored names to camelCased
      _.each(attrs, function(val, key) {
        var camelCased = _s.camelize(key);
        if ( camelCased !== key ) {
          attrs[camelCased] = val;
          delete attrs[key];
        }
      });

      return attrs;
    }
  });

  _.extend(BaseModel.prototype, Backbone.Validation.mixin);

  return BaseModel;

});
