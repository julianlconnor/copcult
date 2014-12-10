/** @jsx React.DOM */
var React = require('react');

var Comment = React.createClass({

  render: function() {
    return (
      <li className="comment row">
        <div className="two columns">
          <img className="img-circle" src={this.props.comment.user.instagramProfilePicture} />
        </div>
        <article className="ten columns">{this.props.comment.text}</article>
      </li>
    );
  }

});

module.exports = Comment;
