/** @jsx React.DOM */

var React = require('react');
var ajax = require('../helpers/ajax');

var AddItem = require('./add_item');
var ImageItems = require('./image_items');
var ImageComments = require('./image_comments');

var ShowImages = React.createClass({

  getInitialState: function() {
    return {
      image: {
        items: []
      }
    };
  },

  componentWillMount: function() {
    return ajax({
      url: '/api/v1/images/' + this.props.id,
      type: 'GET'
    }).then(function(response) {
      this.setState({
        image: response.data
      });
    }.bind(this));
  },

  addItem: function(data) {
    ajax({
      type: 'POST',
      url: '/api/v1/images/' + this.props.id + '/items',
      data: data,
    }).then(function(response) {
      this.setState({
        image: response.data
      });
    }.bind(this));
  },

  render: function() {
    return (
      <div className="show-image">
        <div className="col-md-6 col-md-offset-1 text-center">
          <img src={ this.state.image.standardResolution } />
          <p>{ this.state.image.caption }</p>
          <ImageComments imageId={this.props.id} comments={this.state.image.comments} />
        </div>
        <div className="col-md-5">
          <ImageItems items={this.state.image.items} />
          <AddItem handleSubmit={this.addItem} />
        </div>
      </div>
    );
  }

});

module.exports = ShowImages;
