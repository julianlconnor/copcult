/** @jsx React.DOM */

define([
  'react',
  'react-router',

  'jsx!webapp/public/js/components/app_wrapper',
  'jsx!webapp/public/js/views/home'
], function(React, ReactRouter, AppWrapper, HomeView) {

  var Route = ReactRouter.Route;
  var Routes = ReactRouter.Routes;
  var DefaultRoute = ReactRouter.DefaultRoute;

  var routes = (
    <Routes location="history">
      <Route name="app" path="/" handler={AppWrapper}>
        <DefaultRoute handler={HomeView}/>
      </Route>
    </Routes>
  );

  React.renderComponent(routes, $('#content').get(0));
});
