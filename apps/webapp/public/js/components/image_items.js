/** @jsx React.DOM */

var React = require('react');

var Item = require('./item');

var ImageItems = React.createClass({

  render: function() {
    var outlet = null;

    if ( this.props.items.length ) {
      var items = this.props.items.map(function(item) {
        return <Item item={item} key={item.id} />;
      });
      
      outlet = (
        <ul className="items">
          {items}
        </ul>
      );
    } else {
      outlet = (
        <h3>No one has recognized this style yet, will you be the first?</h3>
      );
    }

    return (
      <div className="col-md-3">
        <h2>Gear</h2>
        {outlet}
      </div>
    );
  }

});

module.exports = ImageItems;
