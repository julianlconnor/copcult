/** @jsx React.DOM */

define([
  'react'
], function(React) {

  var Image = React.createClass({

    render: function() {
      return (
        <li>
          <a href={'/images/' + this.props.data.id}>
            <img src={this.props.data.thumbnail} />
          </a>
        </li>
      );
    }

  });

  return Image;

});
