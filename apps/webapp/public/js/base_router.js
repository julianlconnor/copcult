define([
  'backbone',
  'react',
  'bluebird',
  'webapp/public/js/helpers/route',
  'backbone.queryparams',
], function(Backbone, React, Promise, Route) {

  var BaseRouter = Backbone.Router.extend({

    container: document.getElementById('content'),

    // Hooks
    execute: function(callback, args) {
      if (!callback) { return; }

      var res;
      if ( Route.isRouteConstructor(callback) ) {
        res = new callback();
        // if a route object is returned, execute its hooks
        res.preInitialize();
        // if initialize doesn't return a promise, cast it to one
        var promise = Promise.resolve(res.initialize.apply(res, args));
        promise.done(res.render.bind(res), this.handleError.bind(this));
      } else {
        res = callback.apply(this, args);
      }
    },

    routes: {
      '*notFound': 'render404'
    },

    handleError: function() {
      console.error('Error');
    }

  });

  return BaseRouter;

});

