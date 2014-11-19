var BaseModel = require('./base');

var Media = BaseModel.extend({

  tableName: 'media',
  hasTimestamps: ['created_at', 'updated_at']

});

module.exports = Media;
