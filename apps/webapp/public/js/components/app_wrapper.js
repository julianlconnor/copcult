/** @jsx React.DOM */

var _ = require('lodash');
var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var User = require('../models/user');
var user = new User(window.jaded.user);

var AppWrapper = React.createClass({
  render: function() {
    return (
      <div className="container">
        <RouteHandler {..._.extend(this.props, { user: user })} />
      </div>
    );
  }
});

module.exports = AppWrapper;
