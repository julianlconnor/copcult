var User = require('../models/user');

module.exports = {

  post: function(req, res) {
    var email = req.param('email');
    var username = req.param('username');
    var password = req.param('password');

    return new User({
      email: email,
      username: username,
      password: password
    }).save().then(function(user) {
      res.json(user.omit('password'));
    }).catch(function() {
      console.error('Unable to create user');
      res.send('Unable to create user');
    });
  },

  getAll: function(req, res) {
    return new User().fetchAll().then(function(users) {
      res.send(users.toJSON());
    }).catch(function() {
      console.error('Unable to fetch all users', arguments);
      res.send('An error occurred.');
    });
  }

};
