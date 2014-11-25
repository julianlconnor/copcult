/** @jsx React.DOM */

define([
  'react'
], function(React) {

  var Image = React.createClass({

    render: function() {
      return (
        <img src={this.props.data.thumbnail} />
      );
    }

  });

  return Image;

});
