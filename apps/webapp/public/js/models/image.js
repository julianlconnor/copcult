var BaseModel = require('./base');

var CommentCollection = require('../collections/comments');
var ItemCollection = require('../collections/items');

var Image = BaseModel.extend({

  defaults: {
    items: new ItemCollection(),
    comments: new CommentCollection()
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

    attrs.caption = attrs.caption || '';

    attrs.items = new ItemCollection(attrs.items);
    attrs.comments = new CommentCollection(attrs.comments);

    return attrs;
  }

});

module.exports = Image;
