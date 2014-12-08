/** @jsx React.DOM */

var React = require('react');

var Image = React.createClass({

  render: function() {
    console.log(this.props.data);
    return (
      <div className="col-md-3">
        <a href={'/images/' + this.props.data.id}>
          <img src={this.props.data.standardResolution} />
        </a>
      </div>
    );
  }

});

module.exports = Image;
