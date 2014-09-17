define([
  'backbone',
  'q',
  'underscore',
  'jquery',
  'shared/js/helpers/error_reporting',
  'jquery.cookie'
], function(Backbone, q, _, $, errorReporting) {

  var originalSync = Backbone.sync;
  var originalAjax = Backbone.ajax;
  var reportXHRError = errorReporting.reportXHRError;

  function sync(method, model, opts) {
    if ( method === 'create' || method === 'update' ||
         method === 'patch' || method === 'delete' ) {

      if ( !opts.data && model ) {
        opts.contentType = 'application/json';
        opts.data = opts.attrs || model.toJSON(opts);
      }

      opts.data = _.extend({
        '_xsrf': $.cookie('_xsrf'),
        'user_id': window.arbiter.user.id
      }, opts.data);

      opts.data = JSON.stringify(opts.data);
    }

    return originalSync(method, model, opts);
  }

  function ajaxPatch(opts) {
    var method = opts.type || opts.method;

    if ( typeof opts.data === 'object' &&
         method === 'POST' || method === 'PUT' ||
         method === 'PATCH' || method === 'DELETE' ) {
      opts.data._xsrf = $.cookie('_xsrf');
    }

    if ( opts.contentType === 'application/json' && typeof opts.data === 'object' ) {
      opts.data = JSON.stringify(opts.data);
    }

    return q(originalAjax(opts)).then(null, function(err) {
      reportXHRError(method, opts.url, err);
      throw err;
    });
  }

  /**
  * Add XSRF from template and/or auth token from cookies
  * Settings is hash of $.ajax options along with:
  *   addXSRF (default false) - Add Tornado XSRF token to request params
  *   withCredentials (default false) - Tell xhr to send cookies as well
  */
  function ajax(settings) {
    var httpMethod = (settings.type || settings.method).toLowerCase();

    function addToData(key, val) {
      if ( settings.data === null || typeof settings.data !== 'object' ) {
        settings.data = {};
      }
      settings.data[key] = val;
    }

    if ( httpMethod === 'post' || httpMethod === 'put' ||
         httpMethod === 'patch' || httpMethod === 'delete' ) {
      /**
      * If modifying a resource, append XSRF.
      * Our Tornado APIs don't check for xsrf on GET requests.
      */
      addToData('_xsrf', $.cookie('_xsrf'));
    }

    addToData('user_id', window.arbiter.user.id);

    if ( settings.withCredentials === true ) {
      settings.xhrFields = { withCredentials: true };
      delete settings.withCredentials;
    }

    if ( httpMethod === 'delete' ) {
      /**
      * jquery only appends to querystring for GET requests, hence this little
      * bit to work similarly for DELETEs
      * https://github.com/jquery/jquery/blob/1.4.3/src/ajax.js#L279
      */
      var rquery = /\?/;

      settings.url += (rquery.test(settings.url) ? "&" : "?") + $.param(settings.data);
      delete settings.data;
    }

    return q($.ajax(settings)).then(null, function(err) {
      reportXHRError(httpMethod, settings.url, err);
      throw err;
    });
  }

  Backbone.sync = sync;
  Backbone.ajax = ajaxPatch;

  window.ajax = ajax;

  return ajax;
});
