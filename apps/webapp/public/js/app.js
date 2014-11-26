var $ = require('jquery');
var FastClick = require('fastclick');

console.log('foo');

var AppRouter = require('./app_router');

$.ajaxSetup({ cache: false });
FastClick.attach(document.body);
