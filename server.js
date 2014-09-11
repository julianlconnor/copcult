/*
* Import dependencies.
*/
var http = require('http');
var path = require('path');

var connect = require('connect');
var express = require('express');

var passport = require('passport');
require('./config/passport_strategies');

var RedisStore = require('connect-redis')(express);

var exphbs = require('express3-handlebars');

var settings = require('./config/settings')();


/**
* Rack style apps.
*/
var api = require('./apps/api');
var shared = require('./apps/shared');
var webapp = require('./apps/webapp');

var app = express();
app.configure(function(){
  app.set('port', process.env.PORT || 9001);

  app.use(express.cookieParser('arbiteroftaste'));
  app.use(express.session({
    store: new RedisStore({
      host: settings.redis.host,
      port: settings.redis.port,
      prefix: 'arbiter:dev:sess:'
    })
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.engine('handlebars', exphbs({ defaultLayout: 'base' }));
  app.set('view engine', 'handlebars');

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('arbiteroftaste'));

  app.use(app.router);

  app.use(express.static(path.join(__dirname, 'build')));
  /*
  * Client side apps.
  */
  app.use(shared);
  app.use('/api/v1', api);

  /**
  * Passport.
  */
  app.get('/auth/instagram', passport.authenticate('instagram'));
  app.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login', successRedirect: '/' }));

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  app.use(webapp); // last because of route catch-all (.*)

  if ( !settings.onDev() ) {
    app.use(connect.compress());
  }
});

function requiresAuth(req, res, next) {
  if ( req.isAuthenticated() ) {
    return next();
  }

  res.redirect('/');
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Arbiter ~~ ' + app.get('port'));
});
