var User = require('../api/models/user');

var path = require('path');
var exphbs = require('express3-handlebars');

var express = require('express');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  defaultLayout: 'base',
  partialsDir: path.join(__dirname, 'views', 'partials')
}));

app.use('/app/', express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {

  if ( !req.user ) {
    return res.render('loggedOut');
  }

  if ( !req.cookies.accessToken ) {
    res.cookie('accessToken', req.user.accessToken, { httpOnly: true });
  }

  return res.render('loggedIn', {
    user: JSON.stringify(req.user.omit('password'))
  });
});

app.get('/:username', function(req, res) {
  new User({
    instagramUsername: escape(req.param('username'))
  })
  .fetch({ withRelated: ['storefronts', 'storefronts.items'] })
  .then(function(user) {
    res.render('userProfile', user.toJSON());
  }).catch(function() {
    res.send(500, 'Storefront not found.');
  });
});

module.exports = app;

