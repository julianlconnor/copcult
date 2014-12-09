/** @jsx React.DOM */

var React = require('react');

var Image = React.createClass({

  render: function() {
    console.log(this.props.model.toJSON());
    return (
      <div className="col-md-3">
        <a href={'/images/' + this.props.model.get('id')}>
          <img src={this.props.model.get('standardResolution')} />
        </a>
      </div>
    );
  }

});

module.exports = Image;
