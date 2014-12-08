/** @jsx React.DOM */

var React = require('react');

var BrandView = React.createClass({

  componentWillMount: function() {
    /**
    * Fetch brand items.
    */
    console.log('foo');
  },

  render: function() {
    return (
      <div>
        <h1>Brand</h1>
      </div>
    );
  }
});

module.exports = BrandView;
