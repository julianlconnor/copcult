/** @jsx React.DOM */

define([
  'react'
], function(React) {
  var AppWrapper = React.createClass({
    render: function() {
      var activeRoute = this.props.activeRouteHandler;
      return (
        < activeRoute />
      );
    }
  });

  return AppWrapper;
});

