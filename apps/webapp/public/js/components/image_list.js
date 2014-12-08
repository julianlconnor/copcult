/** @jsx React.DOM */

var React = require('react');

var ImageListItem = require('./image_list_item');

var ajax = require('ajax');

var Images = React.createClass({

  getInitialState: function() {
    return {
      images: []
    };
  },

  componentWillMount: function() {
    ajax({
      url: '/api/v1/users/' + jaded.user.id + '/images',
      type: 'GET'
    }).then(function(response) {
      this.setState({
        images: response.data
      });
    }.bind(this));
  },

  render: function() {
    var images = this.state.images.map(function(image) {
      return <ImageListItem data={image} key={image.id} />;
    });

    return (
      <div className="row images">
        {images}
      </div>
    );
  }

});

module.exports = Images;
