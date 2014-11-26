var Backbone = require('backbone');

var BaseCollection = Backbone.Collection.extend({

  apiRoot: function() {
    return '/api/v1';
  }

});

module.exports = BaseCollection;

