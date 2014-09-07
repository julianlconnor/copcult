/** @jsx React.DOM */

define([
  'react',
  'shared/js/helpers/ajax'
], function(React, ajax) {

  var HomeView = React.createClass({

    getInitialState: function() {
      return {
        results: [],
        storefrontItems: []
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

    addResult: function(result) {
      this.setState({
        storefrontItem: this.state.storefrontItems.push(result)
      });
    },

    renderStorefront: function() {
      return this.state.storefrontItems.map(function(item) {
        return (
          <li>
            <div className={item.slug}>
              <a href={item.url}>
                <img src={item.image} />{item.brand} - {item.name} - {item.price}
              </a>
            </div>
          </li>
        );
      });
    },

    renderResults: function() {
      return this.state.results.map(function(result) {
        return <li onClick={this.addResult.bind(null, result)}>{result.brand} - {result.name}</li>;
      }.bind(this));
    },

    render: function() {
      console.log('results', this.state.results);
      return (
        <div className="container">
          <ul className="storefront-items">
            {this.renderStorefront()}
          </ul>
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

  return HomeView;

});
