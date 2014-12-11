var BaseModel = require('./base');

var ImageItem = BaseModel.extend({

  tableName: 'images_items',
  hasTimestamps: ['created_at', 'updated_at']

});

module.exports = ImageItem;


