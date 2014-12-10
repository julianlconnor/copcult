/** @jsx React.DOM */

var React = require('react');

var ShowImage = require('../components/show_image');

var ImageModel = require('../models/image');

var ImageView = React.createClass({

  getInitialState: function() {
    return {
      image: new ImageModel({
        id: this.props.params.imageId
      })
    };
  },

  componentWillMount: function() {
    this.state.image.fetch();
  },

  render: function() {
    return (
      <ShowImage imageModel={this.state.image} />
    );
  }
});

module.exports = ImageView;
