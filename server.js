/*
* Import dependencies.
*/
var http = require('http');
var path = require('path');
var express = require('express');
var connect = require('connect');
var exphbs = require('express3-handlebars');
var RedisStore = require('connect-redis')(express);

var settings = require('./config/settings')();

/**
* Rack style apps.
*/
var api = require('./apps/api');
var oauth = require('./apps/oauth');
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
  app.use('/oauth', oauth);

  app.use(webapp); // last because of route catch-all (.*)


  if ( !settings.onDev() ) {
    app.use(connect.compress());
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Arbiter ~~ ' + app.get('port'));
});
