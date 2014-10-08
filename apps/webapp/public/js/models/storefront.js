define([
  'webapp/public/js/models/base',

  'webapp/public/js/helpers/ajax'
], function(BaseModel, ajax) {

  var Storefront = BaseModel.extend({

    save: function() {
      return ajax({
        type: 'POST',
        url: '/api/v1/storefronts',
        data: this.toJSON()
      });
    }

  });

  return Storefront;

});
