/** @jsx React.DOM */
var React = require('react');
var ajax = require('../helpers/ajax');

var ImageItems = require('./image_items');

var ShowImages = React.createClass({

  getInitialState: function() {
    return {
      image: {
        items: []
      }
    };
  },

  componentWillMount: function() {
    ajax({
      url: '/api/v1/images/' + this.props.id,
      type: 'GET'
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
        </div>
        <ImageItems items={this.state.image.items} />
      </div>
    );
  }

});

module.exports = ShowImages;
