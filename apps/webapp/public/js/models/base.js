define([
  'backbone'
], function(Backbone) {

  var BaseModel = Backbone.Model.extend({

    apiRoot: function() {
      return '/api/v1';
    }

  });

  return BaseModel;
});
