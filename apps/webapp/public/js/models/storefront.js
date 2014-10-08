define([
  'webapp/public/js/models/base',

  'webapp/public/js/models/item',

  'webapp/public/js/helpers/ajax'
], function(BaseModel, Item, ajax) {

  var Storefront = BaseModel.extend({

    defaults: {
      items: []
    },

    save: function() {
      var data = this.toJSON();
      data.items = this.get('items').map(function(item) {
        return item.id;
      });

      return ajax({
        type: 'POST',
        url: '/api/v1/storefronts',
        data: data
      });
    },

    parse: function(response) {
      debugger;
      var items = response.items;

      response.items = items.map(function(itemAttrs) {
        return new Item(itemAttrs);
      });

      return response;
    }

  });

  return Storefront;

});
