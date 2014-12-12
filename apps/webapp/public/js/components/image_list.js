/** @jsx React.DOM */

var React = require('react');

var ImageListItem = require('./image_list_item');

var ImageList = React.createClass({

  mixins: [
    React.BackboneMixin('imageCollection')
  ],

  render: function() {
    var images = this.props.imageCollection.map(function(image) {
      return <ImageListItem model={image} key={image.id} />;
    });

    return (
      <div className="image-list">{images}</div>
    );
  }

});

module.exports = ImageList;
