var BaseModel = require('./base');

var CommentCollection = require('../collections/comments');
var ItemCollection = require('../collections/items');

var Image = BaseModel.extend({

  defaults: {
    items: new ItemCollection(),
    comments: new CommentCollection()
  },

  urlRoot: function() {
    return '/api/v1/images/' + this.id;
  },

  fetch: function() {
    return this.ajax({
      type: 'GET',
      url: this.urlRoot()
    });
  },

  addItem: function(data) {
    return this.ajax({
      type: 'POST',
      url: this.urlRoot() + '/items',
      data: data
    });
  },

  deleteItem: function(item) {
    return this.ajax({
      type: 'DELETE',
      url: this.urlRoot() + '/items/' + item.id
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
