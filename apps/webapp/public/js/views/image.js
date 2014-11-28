/** @jsx React.DOM */

var React = require('react');

var ShowImage = require('../components/show_image');

var ImageView = React.createClass({

  render: function() {
    return (
      <div className="row">
        <ShowImage id={this.props.params.imageId} />
      </div>
    );
  }
});

module.exports = ImageView;
