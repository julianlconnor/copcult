var Backbone = require('backbone');
var ajax = require('ajax');

var BaseModel = Backbone.Model.extend({

  apiRoot: function() {
    return '/api/v1';
  },

  ajax: function(options) {
    return ajax(options).then(function(response) {
      this.set(this.parse(response.data));
    }.bind(this));
  }

});

module.exports = BaseModel;
