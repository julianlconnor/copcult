var BaseModel = require('./base');
var ajax = require('ajax');
  
var User = BaseModel.extend({

  fetchFeed: function() {
    return ajax({
      type: 'GET',
      url: this.apiRoot() + '/users/' + this.id + '/feed'
    }).then(function(response) {
      return response.data;
    });
  }

});

module.exports = User;
