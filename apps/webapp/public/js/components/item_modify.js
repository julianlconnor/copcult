/** @jsx React.DOM */

define([
  'react',

  'jsx!webapp/public/js/components/item'
], function(React, Item) {

  var ItemModify = React.createClass({

    render: function() {
      return (
        <div className="item-modify-wrapper">
          <Item item={this.props.item} />
          <a onClick={this.props.handleDelete.bind(null, this.props.item)}>Delete</a>
        </div>
      );
    }

  });

  return ItemModify;

});

