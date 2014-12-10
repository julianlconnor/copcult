/** @jsx React.DOM */

var ajax = require('ajax');
var React = require('react');

var ImageListItem = require('./image_list_item');
var ImageCollection = require('../collections/images');

var Images = React.createClass({

  getInitialState: function() {
    return {
      images: new ImageCollection()
    };
  },

  componentWillMount: function() {
    return ajax({
      url: '/api/v1/users/' + jaded.user.id + '/feed',
      type: 'GET'
    }).then(function(response) {
      this.setState({
        images: new ImageCollection(response.data)
      });
    }.bind(this));
  },

  render: function() {
    var images = this.state.images.map(function(image) {
      return <ImageListItem model={image} key={image.id} />;
    });

    return (
      <div className="image-list">{images}</div>
    );
  }

});

module.exports = Images;
