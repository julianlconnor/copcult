/** @jsx React.DOM */

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var AppWrapper = React.createClass({
  render: function() {
    console.log('AppWrapper');
    return (
      <div className="container">
        <RouteHandler />
      </div>
    );
  }
});

module.exports = AppWrapper;
