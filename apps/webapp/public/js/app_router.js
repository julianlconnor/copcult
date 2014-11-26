/** @jsx React.DOM */

var $ = require('jquery');
var React = require('react');
var ReactRouter = require('react-router');

var AppWrapper = require('./components/app_wrapper');
var HomeView = require('./views/home');

var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

var routes = (
  <Route handler={AppWrapper} path="/">
    <DefaultRoute handler={HomeView} />
  </Route>
);

ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
  console.log($('#content').get(0));
  React.render(<Handler/>, $('#content').get(0));
});
