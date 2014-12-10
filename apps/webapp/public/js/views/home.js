/** @jsx React.DOM */

var React = require('react');

var Feed = require('../components/feed');
var ImageList = require('../components/image_list');
var SubmitImage = require('../components/submit_image');

var HomeView = React.createClass({

  render: function() {
    return (
      <div>

        <div className="row">
          <h1>Recent</h1>
          <Feed />
        </div>

        <div className="row">
          <h1>Yours</h1>
          <ImageList />
        </div>

        <div className="row">
          <h1>Submit an Image</h1>
          <SubmitImage />
        </div>

      </div>
    );
  }
});

module.exports = HomeView;
