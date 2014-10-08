define([
  'backbone'
], function(Backbone) {

  var BaseCollection = Backbone.Collection.extend({

    apiRoot: function() {
      return '/api/v1';
    }

  });

  return BaseCollection;
});

