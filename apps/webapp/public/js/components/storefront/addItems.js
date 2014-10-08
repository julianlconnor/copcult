/** @jsx React.DOM */

define([
  'react',

  'webapp/public/js/models/item'
], function(React, Item) {

  var AddItems = React.createClass({

    mixins: [ 
      React.BackboneMixin('storefront')
    ],

    addUrl: function(event) {
      event.preventDefault();
      var input = this.refs.search.getDOMNode();

      return new Item({
        url: input.value
      }).save().then(function(item) {
        this.props.storefront.set({
          items: this.props.storefront.get('items').concat([item.id])
        });
        input.value = '';
      }.bind(this));
    },

    renderItems: function() {
      return this.props.storefront.get('items').map(function(id) {
        return (
          <li>{id}</li>
        );
      });
    },

    render: function() {
      return (
        <div className="container">
          <ul className="storefront-items">{this.renderItems()}</ul>
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

