/** @jsx React.DOM */
var React = require('react');

var AddComment = React.createClass({

  handleSubmit: function(evt) {
    evt.preventDefault();

    this.props.handleSubmit(this.refs.input.getDOMNode().value);
  },

  render: function() {
    return (
      <form className="form-inline" role="form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="sr-only" for="input-comment">Comment Text</label>
          <input type="text" ref="input" id="input-comment" className="form-control" placeholder="Comment text.." />
        </div>
        <button className="btn btn-default">Add Comment</button>
      </form>
    );
  }

});

module.exports = AddComment;
