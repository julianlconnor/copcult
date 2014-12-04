/** @jsx React.DOM */

var React = require('react');

var AddItem = React.createClass({

  handleSubmit: function(evt) {
    evt.preventDefault();

    this.props.handleSubmit({
      url: this.refs.input.getDOMNode().value
    });
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input ref="input" placeholder="Gear link.." />
        <button className="btn btn-default">Add gear</button>
      </form>
    );
  }

});

module.exports = AddItem;
