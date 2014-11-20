define([
  'underscore',
  'webapp/public/js/models/base',
  'webapp/public/js/helpers/ajax'
], function(_, BaseModel, ajax) {

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

  return User;

});
