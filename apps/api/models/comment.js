var BaseModel = require('./base');

var Comment = BaseModel.extend({

  tableName: 'comments',

  image: function() {
    return this.belongsTo(require('./image'));
  }

});

module.exports = Comment;


