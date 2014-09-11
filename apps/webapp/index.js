var path = require('path');
var exphbs = require('express3-handlebars');

var express = require('express');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  defaultLayout: 'base',
  partialsDir: path.join(__dirname, 'views', 'partials')
}));

var home = function(req, res) {
  var locals = { 
    user: req.user ? req.user.toJSON() : null
  };
  res.render('index', locals);
};

app.use('/app/', express.static(__dirname));
app.get('/', home);

module.exports = app;

