define([
  'bluebird',
  'react',

  'jsx!webapp/public/js/views/home_view',

  'webapp/public/js/helpers/route'
], function(Promise, React, HomeView, Route) {
  var HomeRoute = Route.extend({
    title: 'Home | Arbiter',

    initialize: function() {
    },

    render: function() {
      return React.renderComponent(new HomeView(), this.el);
    }
  });

  return HomeRoute;
});
