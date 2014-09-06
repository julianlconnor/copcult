var express = require('express');
var app = express();
var _ = require('underscore');
var settings = require('../../config/settings')();
var path = require('path');

var NODE_ENV = ( process.env.NODE_ENV || 'test' ).toLowerCase();

var defaultLocals = {
  env: process.env,
  SERVE_COMPILED: NODE_ENV === 'production' || NODE_ENV === 'staging',
  title: 'Arbiter',
  config: settings.client_side
};

app.set('views', path.join(__dirname, 'views'));

var renderApp = function(req, res) {
  var locals = _.extend({ 
    stylesheet: settings.onDev() ? '/app/public/stylesheets/styles.compiled.css' :
                                   '/build/stylesheets/styles.compiled.css'
  }, defaultLocals);
  res.render('index', locals);
};

app.use('/app/', express.static(__dirname));

app.get('/', renderApp);
app.get('*', renderApp);

module.exports = app;

