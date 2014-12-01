/** @jsx React.DOM */
var React = require('react');

var AddComment = React.createClass({

  handleSubmit: function(evt) {
    evt.preventDefault();

    this.props.handleSubmit(this.refs.input.getDOMNode().value);
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input ref="input" />
        <button>Add Comment</button>
      </form>
    );
  }

});

module.exports = AddComment;
