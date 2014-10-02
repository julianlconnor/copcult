define([
  'jquery',
  'backbone',
  'react',

  'webapp/public/js/app_router',
], function($, Backbone, React, AppRouter) {

  /*
  * Starts our app.
  */
  $.ajaxSetup({ cache: false });

  new AppRouter();

  Backbone.history.start({
    pushState: true,
    root: '/'
  });
});

