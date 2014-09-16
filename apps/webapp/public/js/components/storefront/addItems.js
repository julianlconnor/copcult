/** @jsx React.DOM */

define([
  'react',
  'shared/js/helpers/ajax'
], function(React, ajax) {

  var AddItems = React.createClass({

    getInitialState: function() {
      return {
        results: []
      };
    },
    
    autoComplete: function() {
      return ajax({
        type: 'POST',
        url: '/api/v1/search',
        data: {
          query: this.refs.search.getDOMNode().value
        }
      }).then(function(response) {
        console.log('response', response.data);
        this.setState({
          results: response.data
        });
      }.bind(this));
    },

    renderResults: function() {
      return this.state.results.map(function(result) {
        return <li onClick={this.props.addItem.bind(null, result)}>{result.brand} - {result.name}</li>;
      }.bind(this));
    },

    render: function() {
      console.log('results', this.state.results);
      return (
        <div className="container">
          <div className="input-wrapper">
            <input type="text" placeholder="search.." onKeyUp={this.autoComplete} ref="search" />
          </div>
          <ul className="results-wrapper">
            {this.renderResults()}
          </ul>
        </div>
      );
    }

  });

  return AddItems;

});

