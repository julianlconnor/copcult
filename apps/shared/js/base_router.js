define([
  'backbone',
  'react',
  'q',
  'shared/js/helpers/route',
  'shabu/public/js/routes/login_route',
  'jsx!shared/js/errors/not_found',
  'jsx!shared/js/errors/application_error',
  'backbone.queryparams',
], function(Backbone, React, q, Route, LoginRoute, NotFoundView, ApplicationErrorView) {

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
        var promise = q(res.initialize.apply(res, args));
        promise.done(res.render.bind(res), this.handleError.bind(this));
      } else {
        res = callback.apply(this, args);
      }
    },

    routes: {
      '*notFound': 'render404'
    },

    // Generic
    render404: function() {
      React.renderComponent(new NotFoundView(), this.container);
    },

    render500: function() {
      React.renderComponent(new ApplicationErrorView(), this.container);
    },

    handleError: function(err) {
      if ( err.status === 401 ) {
        this.execute(LoginRoute);
      } else if ( err.status === 404 ||
                  err.status === 400 && err.responseJSON.error.code === 283 ) {
        this.render404();
      } else {
        this.render500();
      }
    }

  });

  return BaseRouter;

});
