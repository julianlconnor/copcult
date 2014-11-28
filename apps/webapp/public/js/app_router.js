/** @jsx React.DOM */

var $ = require('jquery');
var React = require('react');
var ReactRouter = require('react-router');

var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

var AppWrapper = require('./components/app_wrapper');
var HomeView = require('./views/home');
var ImageView = require('./views/image');

var routes = (
  <Route handler={AppWrapper} path="/">
    <Route name="images" path="/images/:imageId" handler={ImageView} />
    <DefaultRoute handler={HomeView} />
  </Route>
);

ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler, state) {
  var params = state.params;
  React.render(<Handler params={params} />, $('#content').get(0));
});
