/** @jsx React.DOM */

var React = require('react');

var Caption = React.createClass({

  getInitialState: function() {
    return {
      showAll: false
    };
  },

  hideAll: function() {
    this.setState({
      showAll: false
    });
  },

  showAll: function() {
    this.setState({
      showAll: true
    });
  },

  render: function() {
    var text = this.props.text || '';

    if ( this.state.showAll ) {
      return (
        <p className="caption" onClick={this.hideAll}>
          {text}
        </p>
      );
    } else {
      if ( text.length ) {
        text = text.substr(0, 60) + '...';
      }
      return (
        <p className="caption" onClick={this.showAll}>
          {text}
        </p>
      );
    }
  }

});

module.exports = Caption;
