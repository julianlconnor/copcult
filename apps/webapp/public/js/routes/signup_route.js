define([
  'q',
  'react',

  'jsx!app/public/js/views/signup_view',

  'shared/js/helpers/route'
], function(q, React, SignupView, Route) {

  var HomeRoute = Route.extend({
    title: 'Home | Venmo',

    initialize: function() {
    },

    render: function() {
      return React.renderComponent(new SignupView(), this.el);
    }
  });

  return HomeRoute;

});
