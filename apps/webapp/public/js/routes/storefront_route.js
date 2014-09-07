
define([
  'q',
  'react',

  'jsx!app/public/js/views/storefront_view',

  'shared/js/helpers/route'
], function(q, React, StorefrontView, Route) {

  var StorefrontRoute = Route.extend({
    title: 'Storefront',

    initialize: function() {
    },

    render: function() {
      return React.renderComponent(new StorefrontView(), this.el);
    }
  });

  return StorefrontRoute;

});
