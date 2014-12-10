var BaseModel = require('./base');

var Item = BaseModel.extend({

  update: function(data) {
    return this.ajax({
      url: '/api/v1/items/' + this.id,
      type: 'PUT',
      data: data
    });
  }

});

module.exports = Item;
