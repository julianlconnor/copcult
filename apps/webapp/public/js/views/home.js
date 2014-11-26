/** @jsx React.DOM */

var React = require('react');

var Images = require('../components/images');
var SubmitImage = require('../components/submit_image');

var User = require('../models/user');

var user = new User(window.jaded.user);

var HomeView = React.createClass({

  render: function() {
    console.log('wap');
    return (
      <div>
        <h1>Submitted Images</h1>
        <Images />
        <h1>Submit an Image</h1>
        <SubmitImage />
      </div>
    );
  }
});

module.exports = HomeView;
