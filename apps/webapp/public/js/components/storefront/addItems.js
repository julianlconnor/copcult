/** @jsx React.DOM */

define([
  'react',

  'jsx!webapp/public/js/components/item',

  'webapp/public/js/models/item'
], function(React, ItemComponent, ItemModel) {

  var AddItems = React.createClass({

    mixins: [ 
      React.BackboneMixin('storefront')
    ],

    addItem: function(event) {
      event.preventDefault();
      var input = this.refs.search.getDOMNode();

      return new ItemModel({
        url: input.value
      }).save().then(function(item) {
        this.props.storefront.set({
          items: this.props.storefront.get('items').concat([item])
        });
        input.value = '';
      }.bind(this));
    },

    renderItems: function() {
      return this.props.storefront.get('items').map(function(item) {
        return (
          <ItemComponent item={item} />
        );
      });
    },

    render: function() {
      return (
        <div className="container">
          <ul className="storefront-items">{this.renderItems()}</ul>
          <div className="input-wrapper">
            <input type="text" placeholder="add a url.." ref="search" />
            <button onClick={this.addItem}>Add url</button>
          </div>
        </div>
      );
    }

  });

  return AddItems;

});

