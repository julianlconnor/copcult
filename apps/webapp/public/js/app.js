define([
  'jquery',
  'backbone',
  'react',

  'webapp/public/js/app_router',

  'shared/js/helpers/user_agent',
  'shared/js/helpers/link_events',

  'jsx!shared/js/errors/old_browser'
], function($, Backbone, React, AppRouter, ua, linkEvents, OldBrowserView) {

  /*
  * Starts our app.
  */
  $.ajaxSetup({ cache: false });

  if ( ua.isOldIE() ) {
    React.renderComponent(new OldBrowserView(), $('#content').get(0));
    return;
  }

  new AppRouter();

  Backbone.history.start({
    pushState: true,
    root: '/'
  });

  linkEvents();
});

