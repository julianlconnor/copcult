define([
  'shared/js/base_router',

  'app/js/routes/home_route',

  'fastclick'
], function(BaseRouter, HomeRoute, FastClick) {

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
