var User = require('../api/models/user');
var Image = require('../api/models/image');
var settings = require('../../config/settings')();

var _ = require('underscore');
var path = require('path');
var exphbs = require('express3-handlebars');
var express = require('express');
var app = express();

var browserify = require('browserify-middleware');

var defaultLocal = {
  SERVE_COMPILED: !settings.onDev()
};

function renderTemplate(req, res, templateName, data) {
  var user = req.user ? req.user.omit('password') : {};

  return res.render(templateName, _.extend(defaultLocal, data || {}, { 
    user: user,
    rawUser: JSON.stringify(user)
  }));
}

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'base'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}));

app.use('/webapp/public/js/app.js', browserify('./apps/webapp/public/js/app.js', {
  transform: ['reactify']
}));
app.use('/webapp/', express.static(__dirname));
app.get('/', function(req, res) {

  if ( !req.user ) {
    return renderTemplate(req, res, 'loggedOut');
  }

  if ( !req.cookies.accessToken ) {
    res.cookie('accessToken', req.user.accessToken, { httpOnly: true });
  }

  return renderTemplate(req, res, 'loggedIn');
});

app.get('/images/:id', function(req, res) {
  var imageId = req.param('id');

  return new Image({
    id: escape(imageId)
  }).fetch({
    withRelated: ['users', 'items', 'comments']
  }).then(function(image) {
    return renderTemplate(req, res, 'showImage', image.toJSON());
  }).catch(function(err) {
    console.error(err);
    res.send(500, 'Unable to find image.');
  });
});

app.get('/:username', function(req, res) {
  /**
  * TODO: make this the last possible route.
  * TODO: blacklist of usernames
  */
  new User({
    instagramUsername: escape(req.param('username'))
  })
  .fetch({ 
    withRelated: ['images']
  }).then(function(user) {
    res.render('userProfile', user.toJSON());
  }).catch(function() {
    res.send(500, 'Storefront not found.');
  });
});

module.exports = app;

