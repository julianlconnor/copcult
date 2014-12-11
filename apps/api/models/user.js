var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

var BaseModel = require('./base');
var Image = require('./image');

var User = BaseModel.extend({

  tableName: 'users',
  hasTimestamps: ['created_at', 'updated_at'],

  images: function() {
    /**
    * TODO: refactor this to use a factory.
    * https://github.com/tgriesser/bookshelf/wiki/Plugin:-Model-Registry
    */
    return this.belongsToMany(require('./image'));
  },

  fetchFeatured: function() {
    /**
    * TODO: implement functionality for fetching featured users.
    */
    return this.fetchAll();
  },

  fetchFeed: function() {
    return this.fetch({
      withRelated: ['images']
    }).then(function(user) {
      var imageIds = user.related('images').map(function(image) {
        return image.id;
      });

      return new Image().query(function(qb) {
        return qb.orderBy('created_at', 'desc').limit(15).whereNotIn('id', imageIds);
      }).fetchAll({
        withRelated: ['users', 'items', 'comments']
      });
    });
  }

});

module.exports = User;
