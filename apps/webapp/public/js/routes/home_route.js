define([
  'q',
  'react',

  'jsx!app/js/views/home_view',

  'shared/js/helpers/route'
], function(q, React, HomeView, Route) {
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
