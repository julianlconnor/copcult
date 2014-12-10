var _ = require('lodash');
var Image = require('../models/image');
var User = require('../models/user');

module.exports.post = function(req, res) {
  var email = req.param('email');
  var username = req.param('username');
  var password = req.param('password');


  /**
  * TODO: Implement
  */
};

module.exports.getAll = function(req, res) {
  return new User().fetchAll().then(function(users) {
    res.send(users.toJSON());
  }).catch(function() {
    console.error('Unable to fetch all users', arguments);
    res.send('An error occurred.');
  });
};

module.exports.images = function(req, res) {
  var userId = req.param('userId');

  return new User({ id: userId }).fetch({ 
    withRelated: [{
      images: function(qb) {
        return qb.orderBy('created_at', 'desc');
      }
    }]
  }).then(function(user) {
    return res.json({
      data: user.related('images').toJSON()
    });
  }).catch(function() {
    console.error('There was an error fetching the user with the id of ', userId, '\'s feed.');
    return res.send(500, 'There was an error fetching the user with the id of ', userId, '\'s feed.');
  });
};

module.exports.feed = function(req, res) {
  var userId = escape(req.param('userId'));

  return new User({ id: userId }).fetch({
    withRelated: ['images']
  }).then(function(user) {
    var imageIds = user.related('images').map(function(image) {
      return image.id;
    });

    return new Image().query(function(qb) {
      return qb.orderBy('created_at', 'desc').limit(15).whereNotIn('id', imageIds);
    }).fetchAll({
      withRelated: ['users', 'items', 'comments']
    }).then(function(images) {
      return res.json({
        data: images.toJSON()
      });
    }).catch(function(err) {
      console.error(err);
      console.error('There was an error fetching the user with the id of ', userId, '\'s feed.');
      return res.send(500, 'There was an error fetching the user with the id of ', userId, '\'s feed.');
    });
  });
};
