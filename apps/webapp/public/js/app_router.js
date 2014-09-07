define([
  'shared/js/base_router',

  'app/public/js/routes/signup_route',
  'app/public/js/routes/storefront_route',
  'app/public/js/routes/home_route',

  'fastclick'
], function(BaseRouter, SignupRoute, StorefrontRoute, 
            HomeRoute, FastClick) {

  var AppRouter = BaseRouter.extend({

    initialize: function() {
      FastClick.attach(document.body);
    },

    routes: {
      'signup': SignupRoute,
      'muffs': StorefrontRoute,

      '': HomeRoute,
      '*notFound': 'render404'
    }

  });

  return AppRouter;

});
