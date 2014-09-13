define([
  'underscore',
  'shared/js/models/base',
  'shared/js/helpers/ajax'
], function(_, BaseModel, ajax) {

  var UserModel = BaseModel.extend({

    fetchMedia: function() {
      var url = 'https://api.instagram.com/v1/users/' + this.get('instagramId') + '/media/recent/?access_token=' + this.get('instagramAccessToken');
      return ajax({
        type: 'GET',
        url: url,
        dataType: 'jsonp',
        crossDomain: true
      }).then(function(response) {
        return response.data;
      });
    }

  });

  return UserModel;

});
