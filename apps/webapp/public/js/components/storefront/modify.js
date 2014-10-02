/** @jsx React.DOM */

define([
  'react',

  'jsx!webapp/public/js/components/item',

  'webapp/public/js/helpers/ajax'
], function(React, ajax) {

  var CreateStorefront = React.createClass({

    renderItems: function() {
      return this.props.storefront.items.map(function(item) {
        return <Item item={item} />;
      });
    },

    render: function() {
      var storefront this.props.storefront;

      return (
        <div>
          <h3>Modifying storefront</h3>
          <img src={storefront.instagramMediaImageUrl} />
          <ul>
            {this.renderItems()}
          </ul>
        </div>
      );
    }

  });

  return CreateStorefront;

});
