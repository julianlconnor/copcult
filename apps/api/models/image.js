var BaseModel = require('./base');

var User = require('./user');

var Image = BaseModel.extend({

  tableName: 'images',
  hasTimestamps: ['created_at', 'updated_at'],

  users: function() {
    return this.belongsToMany(User);
  }

});

module.exports = Image;
