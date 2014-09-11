/** @jsx React.DOM */

define([
  'react'
], function(React) {

  var HomeView = React.createClass({

    getInitialState: function() {
      return {
        results: [],
        storefrontItems: []
      };
    },

    render: function() {
      return (
        <h1>Home View</h1>
      );
    }
  });

  return HomeView;

});
