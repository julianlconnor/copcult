/** @jsx React.DOM */
var React = require('react');

var Image = React.createClass({
  
  mixins: [
    React.BackboneMixin('model')
  ],

  render: function() {
    return <img className="instagram-image" src={this.props.imageModel.get('standardResolution')} />;
  }

});

module.exports = Image;
