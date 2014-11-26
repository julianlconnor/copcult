var Backbone = require('backbone');

var BaseModel = Backbone.Model.extend({

  apiRoot: function() {
    return '/api/v1';
  }

});

module.exports = BaseModel;
