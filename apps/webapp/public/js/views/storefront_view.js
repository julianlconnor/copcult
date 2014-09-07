/** @jsx React.DOM */

define([
  'react'
], function(React) {

  var StorefrontView = React.createClass({
    getInitialState: function() {
      return {
        items: [{
          id: 1,
          brand: 'Zanerobe',
          name: 'Lineback White',
          slug: 'lineback-white',
          image: 'http://lxschuslqu11e9td3pnztu9z8.wpengine.netdna-cdn.com/wp-content/uploads/2014/07/ZNRB_ZANEROBE_100_MONO_0077.jpg',
          url: 'http://zanerobe.com/product/lineback-white/',
          price: '59.95'
        },
        {
          id: 2,
          brand: 'Zanerobe',
          name: 'Cube White',
          slug: 'cube-white',
          image: 'http://lxschuslqu11e9td3pnztu9z8.wpengine.netdna-cdn.com/wp-content/uploads/2014/07/ZNRB_ZANEROBE_100_MONO_0077.jpg',
          url: 'http://zanerobe.com/product/cube-white/',
          price: '49.95'
        }]
      };
    },

    renderItems: function() {
      return this.state.items.map(function(item) {
        return (
          <li>
            <div className={item.slug}>
              <a href={item.url} target="_blank">
                <img src={item.image} />{item.brand} - {item.name} - {item.price}
              </a>
            </div>
          </li>
        );
      });
    },

    render: function() {
      return (
        <ul className="storefront-items">
          {this.renderItems()}
        </ul>
      );
    }

  });

  return StorefrontView;
});
