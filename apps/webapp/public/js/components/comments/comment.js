/** @jsx React.DOM */
var React = require('react');

var Comment = React.createClass({

  render: function() {
    return (
      <li className="comment row">
        <div className="col-md-2">
          <img className="img-circle" src={this.props.comment.user.instagramProfilePicture} />
        </div>
        <article className="col-md-10">{this.props.comment.text}</article>
      </li>
    );
  }

});

module.exports = Comment;
