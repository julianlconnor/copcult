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
      <form className="form-inline" role="form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="sr-only" for="input-link">Gear link</label>
          <input type="text" ref="input" id="input-link" className="form-control" placeholder="Gear link.." />
        </div>
        <button className="btn btn-default">Add gear</button>
      </form>
    );
  }

});

module.exports = AddItem;
