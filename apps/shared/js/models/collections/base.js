define([
  'backbone',
  'backbone.super'
], function(Backbone) {

  var BaseCollection = Backbone.Collection.extend({

    parse: function(resp) {
      return resp.data.map(function(item) {
        return { data: item };
      });
    },

  });

  return BaseCollection;

});

