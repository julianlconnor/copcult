/** @jsx React.DOM */

define([
  'react'
], function(React) {
  var AppWrapper = React.createClass({
    render: function() {
      var ActiveRoute = this.props.activeRouteHandler;
      return (
        <div className="container">
          <ActiveRoute />
        </div>
      );
    }
  });

  return AppWrapper;
});

