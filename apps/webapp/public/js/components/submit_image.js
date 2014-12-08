/** @jsx React.DOM */

var React = require('react');
var ajax = require('ajax');

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
    });
  },

  render: function() {
    return (
      <form className="form-inline" role="form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="sr-only" for="input-instagram-link">Instagram Link</label>
          <input type="text" ref="input" id="input-instagram-link" className="form-control" placeholder="Instagram Link" />
        </div>
        <button className="btn btn-default">Submit Instagram Link</button>
      </form>
    );
  }

});

module.exports = SubmitImage;
