/** @jsx React.DOM */

var React = require('react');

var ImageList = require('../components/image_list');
var SubmitImage = require('../components/submit_image');

var HomeView = React.createClass({

  render: function() {
    return (
      <div>
        <h1>Your Submitted Images</h1>
        <ImageList />
        <h1>Submit an Image</h1>
        <SubmitImage />
      </div>
    );
  }
});

module.exports = HomeView;
