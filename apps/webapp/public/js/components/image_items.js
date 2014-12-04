/** @jsx React.DOM */

var React = require('react');

var Item = require('./items/item');

var ImageItems = React.createClass({

  render: function() {
    var outlet = null;

    if ( this.props.items.length ) {
      var items = this.props.items.map(function(item) {
        return <Item item={item} key={item.id} />;
      });
      
      outlet = (
        <div className="items">
          {items}
        </div>
      );
    } else {
      outlet = (
        <h3>No one has recognized this style yet, will you be the first?</h3>
      );
    }

    return (
      <div className="image-items">
        <h2>Gear</h2>
        {outlet}
      </div>
    );
  }

});

module.exports = ImageItems;
