/** @jsx React.DOM */

var React = require('react');
var ajax = require('../helpers/ajax');

var SubmitImage = React.createClass({

  handleSubmit: function(evt) {
    evt.preventDefault();
    var url = this.refs.input.getDOMNode().value;

    ajax({
      type: 'POST',
      url: '/api/v1/images',
      data: {
        url: url
      }
    }).then(function(response) {
      debugger;
    });
  },

  render: function() {
    return (
      <form className="submit-image" onSubmit={this.handleSubmit}>
        <input ref="input" />
        <button className="btn btn-default">Submit Image</button>
      </form>
    );
  }

});

module.exports = SubmitImage;
