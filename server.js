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
var webapp = require('./apps/webapp');
var shared = require('./apps/shared');

var app = express();
app.configure(function(){
  app.set('port', process.env.PORT || 9001);
  app.use(express.cookieParser('imjaded'));

  var redisOptions;
  if ( settings.onDev() ) {
    redisOptions = {
      host: settings.redis.host,
      port: settings.redis.port,
      prefix: 'jaded:dev:sess:'
    };
  } else {
    redisOptions = {
      url: process.env.REDISTOGO_URL,
      prefix: 'jaded:staging:sess:'
    };
  }
  app.use(express.session({
    store: new RedisStore(redisOptions)
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.engine('handlebars', exphbs({ defaultLayout: 'base' }));
  app.set('view engine', 'handlebars');

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('imjaded'));

  app.use(app.router);

  app.use(express.static(path.join(__dirname, 'build')));

  /**
  * TODO: add an authentication layer, namely an access token.
  * All user ids are passed via qs param, no bueno.
  */
  app.use('/api/v1', /* TODO: check access token, */ api);

  /**
  * Passport.
  *
  * TODO: successRedirect needs to be dynamic, needs to point to 'next' url.
  */
  app.get('/auth/instagram', passport.authenticate('instagram'));
  app.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login', successRedirect: '/' }));

  app.get('/logout', function(req, res){
    res.clearCookie('accessToken');
    req.logout();
    res.redirect('/');
  });

  app.use(shared);
  app.use(webapp); // last because of route catch-all (.*)

  if ( !settings.onDev() ) {
    app.use(connect.compress());
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('jaded ~~ ' + app.get('port'));
});
