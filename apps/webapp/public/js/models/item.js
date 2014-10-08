define([
  'webapp/public/js/models/base',

  'webapp/public/js/helpers/ajax'
], function(BaseModel, ajax) {

  var Item = BaseModel.extend({

    save: function() {
      return ajax({
        type: 'POST',
        url: this.apiRoot() + '/items',
        data: this.toJSON()
      });
    }

  });

  return Item;

});
