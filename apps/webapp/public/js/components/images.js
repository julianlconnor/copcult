/** @jsx React.DOM */

define([
  'react',

  'jsx!webapp/public/js/components/image',

  'webapp/public/js/helpers/ajax'
], function(React, Image, ajax) {

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
        return <Image data={image} key={image.id} />;
      });

      return (
        <ul className="images">
          {images}
        </ul>
      );
    }

  });

  return Images;

});
