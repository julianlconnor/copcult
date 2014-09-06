define([
  'q',
  'react',

  'jsx!app/public/js/views/home_view',

  'shared/js/helpers/route'
], function(q, React, HomeView, Route) {

  var HomeRoute = Route.extend({
    title: 'Home | Venmo',

    initialize: function() {
    },

    render: function() {
      return React.renderComponent(new HomeView(), this.el);
    }
  });

  return HomeRoute;

});
