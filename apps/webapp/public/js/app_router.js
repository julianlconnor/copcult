define([
  'shared/js/base_router',

  'app/public/js/routes/home_route',

  'fastclick'
], function(BaseRouter, LoginRoute, NotificationRoute, LogoutRoute, ProfileRoute,
            SettingsRoute, HomeRoute, FastClick) {

  var AppRouter = BaseRouter.extend({

    initialize: function() {
      FastClick.attach(document.body);
    },

    routes: {
      '': HomeRoute,
      '*notFound': 'render404'
    }

  });

  return AppRouter;

});
