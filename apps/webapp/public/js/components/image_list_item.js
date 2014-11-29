/** @jsx React.DOM */

var React = require('react');

var Image = React.createClass({

  render: function() {
    console.log(this.props.data);
    return (
      <li>
        <a href={'/images/' + this.props.data.id}>
          <img src={this.props.data.thumbnail} />
        </a>
      </li>
    );
  }

});

module.exports = Image;
