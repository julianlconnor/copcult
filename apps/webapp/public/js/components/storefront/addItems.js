/** @jsx React.DOM */

define([
  'react'
], function(React) {

  var AddItems = React.createClass({

    addUrl: function(event) {
      event.preventDefault();
      var input = this.refs.search.getDOMNode();

      this.props.handleUrlAdded(input.value);
      input.value = '';
    },

    render: function() {
      return (
        <div className="container">
          <div className="input-wrapper">
            <input type="text" placeholder="add a url.." ref="search" />
            <button onClick={this.addUrl}>Add url</button>
          </div>
        </div>
      );
    }

  });

  return AddItems;

});

