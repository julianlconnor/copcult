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
        <label for="input-link" className="u-full-width">Gear link</label>
        <input type="text" ref="input" id="input-link" className="u-full-width" placeholder="Gear link.." />
        <button className="u-full-width">Add gear</button>
      </form>
    );
  }

});

module.exports = AddItem;
