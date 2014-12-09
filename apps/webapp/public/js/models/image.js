var BaseModel = require('./base');

var Comments = require('../collections/comments');
var ItemCollection = require('../collections/items');

var Image = BaseModel.extend({

  defaults: {
    items: new ItemCollection()
  },

  fetch: function() {
    return this.ajax({
      type: 'GET',
      url: '/api/v1/images/' + this.id
    });
  },

  addItem: function(data) {
    return this.ajax({
      type: 'POST',
      url: '/api/v1/images/' + this.id + '/items',
      data: data
    });
  },

  parse: function(response) {
    var attrs = response;

    attrs.comments = new Comments(attrs.comments);
    attrs.caption = attrs.caption || '';

    return attrs;
  }

});

module.exports = Image;
