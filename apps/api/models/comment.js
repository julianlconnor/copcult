var BaseModel = require('./base');

var Comment = BaseModel.extend({

  tableName: 'comments',
  hasTimestamps: ['created_at', 'updated_at'],

  image: function() {
    /**
    * TODO: refactor this into a factory.
    */
    return this.belongsTo(require('./image'));
  },

  user: function() {
    /**
    * TODO: refactor this into a factory.
    */
    return this.belongsTo(require('./user'));
  }

});

module.exports = Comment;


