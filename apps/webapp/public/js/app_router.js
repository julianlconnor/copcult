define([
  'shared/js/base_router',

  'webapp/public/js/routes/home_route',

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
