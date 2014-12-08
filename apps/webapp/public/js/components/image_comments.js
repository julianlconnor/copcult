/** @jsx React.DOM */

var React = require('react');

var ajax = require('ajax');

var Comment = require('./comments/comment');
var AddComment = require('./comments/add');

var ImageComments = React.createClass({

  getInitialState: function() {
    return {
      comments: []
    };
  },

  componentWillMount: function() {
    return ajax({
      type: 'GET',
      url: '/api/v1/images/' + this.props.imageId + '/comments'
    }).then(function(response) {
      this.setState({
        comments: response.data
      });
    }.bind(this));
  },

  addComment: function(text) {
    return ajax({
      type: 'POST',
      url: '/api/v1/images/' + this.props.imageId + '/comments',
      data: {
        text: text
      }
    }).then(function(response) {
      this.setState({
        comments: response.data
      });
    }.bind(this));
  },

  render: function() {
    var comments = this.state.comments.map(function(comment) {
      return <Comment comment={comment} />;
    });

    return (
      <div className="comments-wrapper">
        <ul className="comments">
          {comments}
        </ul>
        <AddComment handleSubmit={this.addComment} />
      </div>
    );
  }

});

module.exports = ImageComments;
