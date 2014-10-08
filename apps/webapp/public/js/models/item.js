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
      }).then(function(resp) {
        var attrs = this.parse(resp);
        this.set(attrs);

        return this;
      }.bind(this));
    }

  });

  return Item;

});
