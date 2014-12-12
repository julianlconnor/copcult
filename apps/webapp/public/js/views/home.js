/** @jsx React.DOM */

var React = require('react');

var Feed = require('../components/feed');
var ImageList = require('../components/image_list');
var SubmitImage = require('../components/submit_image');

var ImageCollection = require('../collections/images');

var HomeView = React.createClass({

  getInitialState: function() {
    return {
      submittedImages: new ImageCollection()
    };
  },

  componentWillMount: function() {
    return this.state.submittedImages.fetchSubmittedImages();
  },

  render: function() {
    return (
      <div>

        <div className="row">
          <h1>Recent</h1>
          <Feed />
        </div>

        <div className="row">
          <h1>Yours</h1>
          <ImageList imageCollection={this.state.submittedImages} />
        </div>

        <div className="row">
          <h1>Submit an Image</h1>
          <SubmitImage imageCollection={this.state.submittedImages} />
        </div>

      </div>
    );
  }
});

module.exports = HomeView;
